interface ButtonProps {
    label: string;
    Icon?: any;
    color?: any;
    borderColor?: any;
    bgColor?: any;
    disabled?: boolean;
    handleClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
    style?: React.CSSProperties | undefined;
    type?: any;
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
            onClick={handleClick ? handleClick : () => {}}
            type={type ? type : 'button'}
        >
            {Icon ? Icon : <span></span>}
            <span>{label}</span>
        </button>
    );
};

export default Button;
