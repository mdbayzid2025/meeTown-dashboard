import JoditEditor from 'jodit-react';
import { useRef, useState } from 'react';

const About = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');

    const config = {
        readonly: false,
        placeholder: "Start typing...",
        style: {
            height: "65vh",
            background: "white",
        },
    };
    return (
        <div>
            <h3 className='text-xl font-semibold text-grayMedium mb-6'>About Us</h3>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} 
                onBlur={newContent => setContent(newContent)} 
            />
        </div>
    )
}

export default About