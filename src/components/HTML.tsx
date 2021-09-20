import { HelmetData } from 'react-helmet';

type HTMLProps = {
    helmet: HelmetData;
    children: React.ReactNode;
}

function HTML({ helmet, children }: HTMLProps) {
    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    return (
        <html {...htmlAttrs}>
            <head>
                {helmet.title.toComponent()}
                {helmet.meta.toComponent()}
                {helmet.link.toComponent()}
            </head>
            <body {...bodyAttrs}>
                {children}
            </body>
        </html>
    );
}

export default HTML;