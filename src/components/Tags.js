import React from "react";

export default function Tags({ tags }) {
    return (
        <div>
            <div>
                <div className="blog-heading text-start py-2 mb-4">Etiquetas</div>
            </div>
            <div className="tags">
                {tags?.map((tag, index) => (
                    <p className="tag" key={index}>
                        {tag}
                    </p>
                ))}
            </div>
        </div>
    )
}