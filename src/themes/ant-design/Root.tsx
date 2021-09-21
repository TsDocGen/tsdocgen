import { HelmetData } from 'react-helmet';

type RootProps = { helmet: HelmetData, docs: any[], projectName: string }

const Root: React.FC<RootProps> = ({ helmet }) => {
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
            </body>
        </html>
    );
}

export default Root;