import classes from './Label.module.css';

interface LabelProps {
    htmlFor: string;
    label: string;
}

export default function Label({ htmlFor, label }: LabelProps) {
    return (
        <label htmlFor={htmlFor} className={classes.label}>
            {label}
        </label>
    );
}
