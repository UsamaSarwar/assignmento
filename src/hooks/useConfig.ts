import { useState, useEffect } from 'react';
import { getConfig, setConfig as setStoredConfig } from '@/lib/storage';

export function useConfig(key: string, defaultValue: string) {
  const [value, setValue] = useState<string>(defaultValue);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getConfig(key, defaultValue).then((val) => {
      setValue(val);
      setLoading(false);
    });
  }, [key, defaultValue]);

  const updateConfig = async (newValue: string) => {
    setValue(newValue);
    await setStoredConfig(key, newValue);
  };

  return [value, updateConfig, loading] as const;
}
