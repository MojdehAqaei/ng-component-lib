import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  Attribute,
  ContentChild,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClTreeNode } from '@sadad/component-lib/src/models';
import { ClInputTextComponent } from '@sadad/component-lib/src/lib/input-text';
import { ClSkeletonDirective } from '@sadad/component-lib/src/lib/skeleton';
import { ClCheckboxComponent } from '@sadad/component-lib/src/lib/checkbox';
import { FormsModule } from '@angular/forms';
import { ClTemplateDirective } from '@sadad/component-lib/src/lib/template';
import { ClSharedService } from '@sadad/component-lib/src/services';
import { ClBadgeDirective } from '@sadad/component-lib/src/lib/badge';

const INITIAL_VALUE: { [key: string]: any } = {
  selectionMode: 'single'
};

@Component({
  selector: 'cl-tree',
  standalone: true,
  imports: [
    CommonModule,
    ClInputTextComponent,
    ClSkeletonDirective,
    ClCheckboxComponent,
    FormsModule,
    ClBadgeDirective,
  ],
  templateUrl: './tree.component.html',
})
export class ClTreeComponent implements OnInit, OnChanges {
  @Input() data: ClTreeNode<any>[] = [];
  @Input() dataKey: string = '';
  @Input() selectable: boolean = false;
  @Input() selectionMode: 'single' | 'multiple' = 'single';
  @Input() selection: any[] | any | null = null;
  @Input() loading: boolean = false;
  @Input() filterable: boolean = false;
  @Output() selectionChange = new EventEmitter();
  @Output() onNodeSelect = new EventEmitter<ClTreeNode<any>>();
  @Output() onNodeUnSelect = new EventEmitter<ClTreeNode<any>>();
  @Output() onNodeExpand = new EventEmitter();
  @Output() onNodeCollapse = new EventEmitter();
  @Output() onContextMenuOpen = new EventEmitter<ClTreeNode<any>>();


  filterNodes: ClTreeNode<any>[] = [];
  filterText: string = '';

  @ContentChild(ClTemplateDirective) templateRef?: ClTemplateDirective;

  constructor(@Attribute("styleClasses") public styleClasses: string = '',
              private _sharedService: ClSharedService) {
  }

  ngOnInit() {
    this._sharedService.resetObjectValues(this, INITIAL_VALUE);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.filterNodes = this.data;
    }
    if (this.data?.length && this.selectable) {
      this.updateTreeNodes(this.data);
    }
  }

  updateTreeNodes(nodes: ClTreeNode<any>[], parent?: ClTreeNode<any>) {
    let allChildrenSelected = true;
    let partialSelected = false;
    nodes.forEach(node => {
      node['parent'] = parent;
      if (this.selection && this.selectionMode === 'single') {
        node.selected = this.dataKey ? node.data[this.dataKey] == this.selection : node.data == this.selection;
      } else if (this.selection?.length && this.selectionMode === 'multiple') {
        node.selected = this.selection?.find((x: any) => this.dataKey ? node.data[this.dataKey] === x : node.data === x);
      }
      if (node?.children?.length) {
        this.updateTreeNodes(node.children, node);
      }

      if (this.selectionMode === 'multiple') {
        allChildrenSelected = !!node.selected && allChildrenSelected;
        partialSelected = partialSelected || !!node.selected || !!node.partialSelected;
      }
    });
    if (parent && this.selectionMode === 'multiple') {
      if (allChildrenSelected) {
        parent.allChildrenSelected = true;
      } else {
        parent.partialSelected = partialSelected;
      }
    }
  }

  onToggleItem(item: ClTreeNode<any>) {
    item.expanded = !item.expanded;
    item.expanded ? this.onNodeExpand.emit(item) : this.onNodeCollapse.emit(item);
  }

  expandRecursive(nodeList: ClTreeNode<any>[], isExpand: boolean) {
    nodeList.forEach((node: ClTreeNode<any>) => {
      node.expanded = isExpand;
      if (node.children?.length) {
        this.expandRecursive(node.children, isExpand)
      }
    })
  }

  expandAll() {
    this.expandRecursive(this.filterNodes, true);

  }

  collapseAll() {
    this.expandRecursive(this.filterNodes, false);
  }

  selectAll() {
    this.selection = null;
    this.changeSelectionRecursive(this.filterNodes, true, false);
    this.selectionChange.emit(this.selection);
  }

  unSelectAll() {
    this.selection = null;
    this.changeSelectionRecursive(this.filterNodes, false, false);
    this.selectionChange.emit(this.selection);
  }

  onNodeClick(node: ClTreeNode<any>) {
    if (!node.disabled && this.selectable) {
      const selected = !node.selected;
      if (this.selectionMode === 'multiple') {
        this.changeSelectionRecursive([node], selected);
        this.checkPartialSelection(node.parent);
      } else if (this.selectionMode === 'single') {
        this.unSelectAll();
        node.selected = selected;
        this.selection = selected ? this.dataKey ? node.data[this.dataKey] : node.data : null;
      }
      this.selectionChange.emit(this.selection);
      node.selected ? this.onNodeSelect.emit(node) : this.onNodeUnSelect.emit(node);
    }
  }

  changeSelectionRecursive(nodeList: ClTreeNode<any>[], selected: boolean, partialSelected?: boolean) {
    nodeList.forEach((node: ClTreeNode<any>) => {
      if (!node.disabled) {
        node.partialSelected = partialSelected != undefined && partialSelected != null ? partialSelected : node.partialSelected;
        node.selected = selected;
        if (this.selectionMode === 'multiple') {
          this.changeSelectionList(node, selected);
        }
        if (node.children?.length) {
          this.changeSelectionRecursive(node.children, selected);
        }
      }
    });
  }

  changeSelectionList(node: ClTreeNode<any>, selected: boolean) {
    this.selection = selected ?
      !this.selection?.find((x: any) => this.dataKey ? node.data[this.dataKey] === x : node.data === x) ? (this.selection || []).concat(this.dataKey ? node.data[this.dataKey] : node.data) : this.selection :
      this.selection?.filter((x: any) => this.dataKey ? node.data[this.dataKey] !== x : node.data !== x);
  }

  checkPartialSelection(node: ClTreeNode<any> | undefined) {
    if (node) {
      let allChildrenSelected = true;
      let partialSelected = false;
      node.children?.forEach(item => {
        allChildrenSelected = !!item.selected && allChildrenSelected;
        partialSelected = partialSelected || !!item.selected || !!item.partialSelected;
      });
      partialSelected = allChildrenSelected ? false : partialSelected;
      if ((allChildrenSelected && !node.selected) || node.partialSelected !== partialSelected) {
        node.partialSelected = !partialSelected;
        if (allChildrenSelected && !node.selected) {
          node.selected = true;
          this.changeSelectionList(node, true);
        }
        this.checkPartialSelection(node.parent);
      }
    }
  }

  filterInputChange(searchValue: any) {
    const val = searchValue?.trim();
    if (val && this.data.length > 0) {
      this.filterText = val;
      this.filterNodes = this.doFilter(JSON.parse(JSON.stringify(this.data)));
    } else {
      this.filterNodes = this.data;
    }
  }

  doFilter(nodes: any[]) {
    return nodes.reduce(this.filterRecursive, [])
  }

  filterRecursive = (nodeList: any[], currentNode: ClTreeNode<any>) => {
    if (currentNode.label?.toLowerCase().indexOf(this.filterText) !== -1) {
      currentNode.expanded = true;
      nodeList.push(currentNode);
      return nodeList;
    }
    if (Array.isArray(currentNode.children)) {
      const children = this.doFilter(currentNode.children);
      if (children.length > 0) {
        currentNode.expanded = true;
        nodeList.push({...currentNode, children});
      }
    }
    return nodeList;
  };

  onRightClick(item: ClTreeNode<any>) {
    this.onContextMenuOpen.emit(item);
  }

}
