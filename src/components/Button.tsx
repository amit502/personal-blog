import React from 'react';
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;

interface ButtonProps {
    label: string;
    Icon?: React.ReactNode;
    color?: RGB | RGBA | HEX | string;
    borderColor?: RGB | RGBA | HEX | string;
    bgColor?: RGB | RGBA | HEX | string;
    disabled?: boolean;
    handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    style?: React.CSSProperties | undefined;
    type?: 'button' | 'reset' | 'submit' | undefined;
}

const Button = ({
    label,
    Icon,
    color = 'white',
    bgColor = '#024869',
    borderColor = '#024869',
    disabled = false,
    handleClick,
    style,
    type,
}: ButtonProps) => {
    return (
        <button
            className="d-flex btn"
            style={{
                color: color,
                backgroundColor: bgColor,
                borderColor: borderColor,
                alignItems: 'center',
                alignContent: 'center',
                fontSize: '18px',
                textDecoration: 'none',
                ...style,
            }}
            disabled={disabled}
            onClick={
                handleClick
                    ? handleClick
                    : () => {
                          return;
                      }
            }
            type={type ? type : 'button'}
        >
            {Icon ? Icon : <span></span>}
            <span>{label}</span>
        </button>
    );
};

export default Button;
