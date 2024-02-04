import React from 'react';
import { TextField, Grid } from '@material-ui/core';
import { useFormContext, Controller} from 'react-hook-form';


function FormInput({ name, label, required}) {
    const { control } = useFormContext();

  return (
    <Grid item xs={12} sm={6}>
        <Controller
            control={control}
            name={name}
            defaultValue=''
            render = {({  field: { ref, ...field }, fieldState  })=> (
                <TextField
                    fullWidth
                    name={name}
                    {...field}
                    inputRef={ref}
                    label={label}
                    required
                />
          )}
        />
    </Grid>
  )
}

export default FormInput;