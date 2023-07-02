"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1902],{1902:(C,c,i)=>{i.r(c),i.d(c,{SingleActionPageModule:()=>m});var l=i(4755),s=i(5030),o=i(942),r=i(9892),d=i(727),n=i(9523);const g=[{path:"",component:(()=>{class t{constructor(e,u){this.activatedRoute=e,this.navController=u,this.hasActionStarted=!1,this.alertButtons=[{text:"\u0628\u0644\u0647",role:"confirm",handler:()=>{this.hasActionStarted=!0}},{text:"\u062e\u06cc\u0631",role:"cancel"}],this.subscription=new d.w0}ngOnInit(){}ionViewWillEnter(){const e=+(this.activatedRoute.snapshot.paramMap.get("actionId")||"null");isNaN(e)&&this.navController.navigateRoot("/tabs/home")}ngOnDestroy(){}ionViewDidLeave(){this.subscription.unsubscribe()}}return t.\u0275fac=function(e){return new(e||t)(n.Y36(r.gz),n.Y36(o.SH))},t.\u0275cmp=n.Xpm({type:t,selectors:[["app-single-action"]],decls:26,vars:7,consts:[[1,"ion-no-margin"],["color","primary",1,"fw-bold","action-title"],[1,"nanotech-icon","nanotech-icon-user"],[1,"nanotech-icon","nanotech-icon-arrow-left"],[1,"nanotech-icon","nanotech-icon-location"],[1,"fw-bold","ion-margin-top"],["value","Lorem ipsum dolor sit amet, consectetur adipiscing elit.",1,"ion-margin-bottom",3,"autoGrow"],["expand","block","id","present-alert",1,"ion-no-margin","ion-margin-bottom",3,"color","disabled"],["expand","block","routerDirection","forward",1,"ion-no-margin",3,"color","routerLink","disabled"],["trigger","present-alert","header","\u0622\u06cc\u0627 \u0627\u0637\u0645\u06cc\u0646\u0627\u0646 \u062f\u0627\u0631\u06cc\u062f\u061f","message","\u062a\u0627\u0631\u06cc\u062e: 13402/01/10 | \u0632\u0645\u0627\u0646: 19:58",3,"buttons"]],template:function(e,u){1&e&&(n.TgZ(0,"ion-content")(1,"ion-card",0)(2,"ion-card-content")(3,"ion-label",1),n._uU(4,"\u067e\u0631\u0648\u0698\u0647 1"),n.qZA(),n.TgZ(5,"div")(6,"ion-text"),n._UZ(7,"i",2),n.TgZ(8,"p"),n._uU(9,"\u0627\u062d\u0645\u062f \u0627\u062d\u0645\u062f\u06cc\u0627\u0646"),n.qZA()(),n.TgZ(10,"ion-text"),n._UZ(11,"i",3),n.TgZ(12,"p"),n._uU(13,"\u0646\u0648\u0639 \u0641\u0639\u0627\u0644\u06cc\u062a: \u0622\u0645\u0648\u0632\u0634 \u0648 \u0646\u0635\u0628"),n.qZA()(),n.TgZ(14,"ion-text"),n._UZ(15,"i",4),n.TgZ(16,"p"),n._uU(17,"\u0645\u06a9\u0627\u0646: \u062e\u06cc\u0627\u0628\u0627\u0646 \u062c\u06cc"),n.qZA()()(),n.TgZ(18,"ion-label",5),n._uU(19,"\u0634\u0631\u062d \u0641\u0639\u0627\u0644\u06cc\u062a"),n.qZA(),n._UZ(20,"ion-textarea",6),n.TgZ(21,"ion-button",7),n._uU(22,"\u0634\u0631\u0648\u0639 \u0628\u0647 \u0627\u0646\u062c\u0627\u0645 \u06a9\u0627\u0631"),n.qZA(),n.TgZ(23,"ion-button",8),n._uU(24,"\u067e\u0627\u06cc\u0627\u0646 \u067e\u0631\u0648\u0698\u0647"),n.qZA()()()(),n._UZ(25,"ion-alert",9)),2&e&&(n.xp6(20),n.Q6J("autoGrow",!0),n.xp6(1),n.Q6J("color",u.hasActionStarted?"medium":"primary")("disabled",u.hasActionStarted),n.xp6(2),n.Q6J("color",u.hasActionStarted?"primary":"medium")("routerLink",u.hasActionStarted?"/tabs/score":null)("disabled",!u.hasActionStarted),n.xp6(2),n.Q6J("buttons",u.alertButtons))},dependencies:[o.Ge,o.YG,o.PM,o.FN,o.W2,o.Q$,o.yW,o.g2,o.j9,o.YI,r.rH],styles:["ion-content[_ngcontent-%COMP%]{--background: #cacaca;--padding-bottom: 16px;--padding-start: 32px;--padding-end: 32px}ion-card-content[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:13px}ion-textarea[_ngcontent-%COMP%]{--background: #e5e7eb;--ion-item-border-color: #aaa;--border-width: 2px;border-radius:5px;--padding-end: 4px;--padding-start: 4px;font-size:13px;overflow:hidden;border:var(--border-width) var(--border-style) var(--ion-item-border-color)}ion-alert[_ngcontent-%COMP%]{--ion-color-step-600: #000}ion-label[_ngcontent-%COMP%]{display:block}ion-label[_ngcontent-%COMP%]:not(.action-title){margin-bottom:8px}ion-label.action-title[_ngcontent-%COMP%]{margin-bottom:16px}ion-text[_ngcontent-%COMP%]{display:flex;margin-bottom:8px}ion-text[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}ion-text[_ngcontent-%COMP%]   .nanotech-icon[_ngcontent-%COMP%]{margin-left:6px}"]}),t})()}];let p=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[r.Bz.forChild(g),r.Bz]}),t})(),m=(()=>{class t{}return t.\u0275fac=function(e){return new(e||t)},t.\u0275mod=n.oAB({type:t}),t.\u0275inj=n.cJS({imports:[l.ez,s.u5,o.Pc,p]}),t})()}}]);