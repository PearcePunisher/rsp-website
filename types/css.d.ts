// Allow importing global CSS (side-effect) and CSS Modules in TS
declare module '*.css' {
  const content: { readonly [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
