import { useState } from 'react';
import { getPriority, determineUtility } from './priority';
import { SelectChangeEvent } from '@mui/material';

export function usePriority() {
  const [formState, setFormState] = useState<{
    [key: string]: string;
  }>({
    exploitation: 'none',
    exposure: 'small',
    automatable: 'no',
    valueDensity: 'diffuse',
    humanImpact: 'low',
  });

  const [priority, setPriority] = useState('');

  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const { exploitation, exposure, automatable, valueDensity, humanImpact } = formState;
    const utility = determineUtility(automatable, valueDensity);
    const result = getPriority(exploitation, exposure, utility, humanImpact);
    setPriority(result);
  };

  return {
    formState,
    priority,
    handleChange,
    handleSubmit,
  };
}
