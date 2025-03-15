import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { ClBreadcrumbComponent } from "@sadad/component-lib/src/lib/breadcrumb";

export default {
  title: "Components/Menu/Breadcrumb",
  component: ClBreadcrumbComponent,
  decorators: [
    moduleMetadata({
      imports: [CommonModule, RouterModule],
    }),
  ],
} as Meta;

type Story = StoryObj<ClBreadcrumbComponent>;

export const Default: Story = {
  render: () => ({
    props: {
      text1: `برای افزودن کامپوننت  breadcrumb  به پروژه تنها کافیست  در appRouting  پروژه در هر رکورد داخل data  مقدار  breadcrumb  را مشخص کنید و تگ کامپوننت را به محل دلخواه اضافه کنید . برای مثال در یک پروژه تستی با appRouting زیر : `,
      appRouting: `[
      {
        path: '',
        component: 'DummyComponent',
      }, {
        path: 'home',
        component: HomeComponent,
        data: {
          breadcrumb: 'صفحه اصلی',
        },
        children: [
          {
            path: 'systemSetting',
            component: 'SystemComponent',
            data: {
              breadcrumb: 'مدیریت سامانه'
            },
            children: [
              {
                path: 'user',
                data: {
                  breadcrumb: 'مدبریت کاربران'
                },
                children: [
                  {
                    path: '',
                    component: 'UserComponent'
                  },
                  {
                    path: 'new',
                    component: 'NewUserComponent',
                    data: {
                      breadcrumb: 'کاربر جدید '
                    }
                  },
                  {
                    path: ':id',
                    component: 'UserUpdateComponent',
                    data: {
                      breadcrumb: 'ویرایش کاربر'
                    }
                  }
                ]
              },
            ]
          }
        ]
      }
    ]`,
      text2: ` در app.component.html کد زیر را اضافه کنید `,
      tag: `<cl-breadcumb></cl-breadcumb>`,
      text3: `  سپس در مرورگر مسیر "home/systemSetting/user" را وارد کنید `,
      text4: `خروجی مانند تصویر خواهد بود `,
      image: "/breadcrumb.png",
    },
    template: `
     <style>
          p{
          line-height:1.5;
          }
          pre{
           direction: ltr;background-color: #02024b;color: white;padding:5px
          }
          img{
          width:100%; height:auto;border:1px solid gray
          }
     </style>
      <p >{{text1}}</p>
      <br/>
      <pre >{{appRouting}}</pre>
      <br/>
      <p>{{text2}}</p>
      <pre>{{tag}}</pre>
      <br/>
      <p>{{text3}}</p>
      <br/>
      <p>{{text4}}</p>
      <img [src]="image"/>
    `,
  }),
};
