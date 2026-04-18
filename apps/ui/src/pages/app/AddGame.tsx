import { Box, Button, Card } from '@radix-ui/themes';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import classes from './AddGame.module.css';
import Section from '../../components/ui/Section';
import FormField from '../../components/ui/FormField';
import Label from '../../components/ui/Label';
import Input from '../../components/ui/Input';

interface AddGameFormData {
    name: string;
}

export default function AddGame() {
    const navigate = useNavigate();
    const {
        handleSubmit,
        control,
        formState: { isSubmitting, errors }
    } = useForm<AddGameFormData>({
        defaultValues: { name: '' }
    });

    async function onSubmit(data: AddGameFormData) {
        // TODO: call API to persist game
        console.log('Add game:', data);
        navigate('/app');
    }

    return (
        <div className={classes.container}>
            <title>Add Game | SaveSlot</title>

            <Section title="Add a Game" description="Start tracking a new game in your collection.">
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                    <FormField>
                        <Label htmlFor="name" label="Game name" />
                        <Input
                            id="name"
                            name="name"
                            control={control}
                            rules={{ required: 'Game name is required' }}
                            placeholder="e.g. The Legend of Zelda"
                            size="3"
                            autoFocus
                            error={errors.name?.message}
                        />
                    </FormField>
                    <Button type="submit" size="3" loading={isSubmitting}>
                        Add game
                    </Button>
                </form>
            </Section>
        </div>
    );
}
