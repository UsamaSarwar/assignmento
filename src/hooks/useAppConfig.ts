import { useState, useEffect } from 'react';
import { getConfig, setConfig as setStoredConfig } from '@/lib/storage';
import type { Config } from '@/types';
import { DEFAULT_CONFIG } from '@/types';

export function useAppConfig() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load all config values from IndexedDB
    const loadConfig = async () => {
      const storedConfig = { ...DEFAULT_CONFIG };
      const keys = Object.keys(DEFAULT_CONFIG) as (keyof Config)[];
      
      for (const key of keys) {
        const value = await getConfig(key, DEFAULT_CONFIG[key]?.toString() ?? '');
        // Handle type conversions
        if (typeof DEFAULT_CONFIG[key] === 'boolean') {
          (storedConfig as Config)[key] = (value === 'true') as never;
        } else if (typeof DEFAULT_CONFIG[key] === 'number') {
          (storedConfig as Config)[key] = parseFloat(value) as never;
        } else {
          (storedConfig as Config)[key] = value as never;
        }
      }
      
      setConfig(storedConfig);
      setLoading(false);
    };

    loadConfig();
  }, []);

  const updateConfig = async (newConfig: Config) => {
    setConfig(newConfig);
    const keys = Object.keys(newConfig) as (keyof Config)[];
    for (const key of keys) {
      const val = newConfig[key];
      if (val !== undefined) {
        await setStoredConfig(key, val.toString());
      }
    }
  };

  return { config, updateConfig, loading };
}
