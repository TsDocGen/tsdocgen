import { ThemeProps } from '../types/theme';
import App from './App';

type RootProps = ThemeProps

const Root: React.FC<RootProps> = ({ helmet, docs, projectName }) => {
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
                <App docs={docs} name={projectName} />
            </body>
        </html>
    );
}

export default Root;