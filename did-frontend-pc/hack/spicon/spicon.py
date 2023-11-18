import os
import base64

def generate(icons_path='./icons', style_path='./spicon.scss'):
    css_classes = []
    for filename in os.listdir(icons_path):
        with open(os.path.join(icons_path, filename), 'rb') as f:
            extension = filename.split('.')[-1]
            if extension == "svg":
                extension = "svg+xml"
            base64_uri = 'data:image/{};base64,{}'.format(extension, base64.b64encode(f.read()).decode('utf-8'))
            css_classes.append('''
            .spicon-{name} {{
                background-image: url("{base64_uri}");
                display: inline-block;
                background-repeat: no-repeat;
                background-position: center;
                background-size: 100%;
            }}
            '''.format(
                name=filename.split('.')[0].lower(),
                base64_uri=base64_uri,
            ))
    with open(style_path, 'w') as f:
        f.write(''.join(css_classes))

generate()