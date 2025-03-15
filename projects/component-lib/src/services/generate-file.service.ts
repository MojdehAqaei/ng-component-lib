import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { ClFile } from '@sadad/component-lib/src/models';
import { ClSignature, ClSignatures } from '@sadad/component-lib/src/enums';


@Injectable({
  providedIn: 'root'
})
export class ClGenerateFileService {

  readonly #renderer: Renderer2;

  constructor(private _rendererFactory: RendererFactory2) {
    this.#renderer = this._rendererFactory.createRenderer(null, null);
  }

  protected blobToDataUrl(blobs: Blob[]) {
    return Promise.all(blobs?.map(
      blob => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      }
    ))
  }

  public blobToBase64(blobs: Blob[]) {
    return this.blobToDataUrl(blobs).then(data => {
      return data?.map((text: any) => text.slice(text.indexOf(",") + 1))
    });
  }

  public detectMimeType(base64?: string) {
    for (const s in ClSignatures) {
      if (base64?.indexOf(s) === 0) {

        // @ts-ignore
        return ClSignatures[s as ClSignature];
      }
    }
  }

  public generateDownloadableFile(data: ClFile) {
    const fileExtension = this.detectMimeType(data.base64File);
    const linkSource = `data:application/${fileExtension};base64, ${data.base64File}`;

    const downloadLink = this.#renderer.createElement('a')
      const fileName = data.name;

      downloadLink.href = linkSource;
      downloadLink.download = fileName;
      downloadLink.click();
    }
}
