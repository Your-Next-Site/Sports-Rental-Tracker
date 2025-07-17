import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {  useEffect, useState } from 'react';


export function useSetTabNavigation() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentTab = searchParams.get("currentTab");
  const rentedOutPage = searchParams.get("rentedOutPage");
  const searchPage = searchParams.get("searchPage") || 0;
  const departureDate = searchParams.get("departureDate")


  
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;

    if (!currentTab) {
      params.set("currentTab", "Departure");
      needsUpdate = true;
    }

    if (!rentedOutPage) {
      params.set("rentedOutPage", "0");
      needsUpdate = true;
    }

    if (!searchPage) {
      params.set("searchPage", "0");
      needsUpdate = true
    }
    if (!departureDate) {
      params.set("departureDate", new Date(new Date().getTime() - Number(process.env.NEXT_PUBLIC_OFFSET) * 60 * 60 * 1000).toISOString().split('T')[0]);
      needsUpdate = true
    }

    if (needsUpdate) {
      router.push(`${pathname}?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [currentTab, rentedOutPage, pathname, router]);

}




interface UseDebounceOptions {
  delay: number;
  onDebounce: (value: string) => void;
}

const useDebounce = (initialValue: string, options: UseDebounceOptions): [string, (value: string) => void] => {
  const [inputValue, setInputValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(inputValue);
      options.onDebounce(inputValue);
    }, options.delay);
    return () => clearTimeout(timeoutId);
  }, [inputValue, options.delay, options.onDebounce]);

  const updateValue = (newValue: string) => {
    setInputValue(newValue);
  };

  return [inputValue, updateValue];
};

export default useDebounce;