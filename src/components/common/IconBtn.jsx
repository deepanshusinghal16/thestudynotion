import React from 'react'

const IconBtn = ({
    text,
    onClickFxn = () => { },
    children,
    disabled,
    outline = false,
    customClasses,
    type,
}) => {
    return (
        <button
            disabled={disabled}
            onClick={() => onClickFxn()}
            type={type}
            className={`${customClasses}`}
        >
            {
                children ? (
                    <>
                        <span>
                            {text}
                        </span>
                        {children}
                    </>
                ) : (
                    <span>
                        {text}
                    </span>
                )
            }
        </button >
    )
}

export default IconBtn
