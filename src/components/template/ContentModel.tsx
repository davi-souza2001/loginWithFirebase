
interface ContentModelProps {
    children: any
}

export default function ContentModel(props: ContentModelProps) {
    return (
        <div className={`
            flex flex-col w-2/3
             text-gray-800 
        `}>
            {/* <Title>{props.titulo}</Title> */}
            <div className="p-6">
                {props.children}
            </div>
            
        </div>
    )
}
