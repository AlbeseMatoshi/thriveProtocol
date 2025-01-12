import {ButtonProps} from "../../utils/api/interfaces/ButtonProps.ts";
import clsx from "clsx";
import './Button.css'

export const Button: React.FC<ButtonProps>=({
                                                variant='primary',
                                                size='medium',
                                                isLoading = false,
                                                disabled = false,
                                                startIcon,
                                                endIcon,
                                                children,
                                                className,
                                                ...props
                                            }) => {
    const isDisabled = disabled || isLoading;

    return (
        <button
            className={clsx(
                'button',
                `button--${variant}`,
                `button--${size}`,
                { 'button--loading': isLoading },
                className
            )}
            disabled={isDisabled}
            {...props}
        >
            {isLoading && <span className="button__spinner" />}
            {!isLoading && startIcon && <span className="button__icon">{startIcon}</span>}
            <span className="button__text">{children}</span>
            {!isLoading && endIcon && <span className="button__icon">{endIcon}</span>}
        </button>
    );
}