import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';


export function useTabNavigation(tabs: string[], defaultTab: string) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentTab = searchParams.get("currentTab");
  const rentedOutPage = searchParams.get("rentedOutPage");
  const searchPage = searchParams.get("searchPage") || 0;
  const departureDate = searchParams.get("departureDate")


  const [selectedTab, setSelectedTab] = useState(currentTab || defaultTab);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      // Ensure rentedOutPage is set to 0 if not present
      if (!params.has("rentedOutPage")) {
        params.set("rentedOutPage", "0");
      }
      return params.toString();
    },
    [searchParams]
  );

  // Set default tab and rentedOutPage in URL if either is missing
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    let needsUpdate = false;

    if (!currentTab) {
      setSelectedTab(defaultTab);
      params.set("currentTab", defaultTab);
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
  }, [currentTab, rentedOutPage, pathname, router, defaultTab]);

  const handleTabClick = useCallback(
    (tab: string) => {
      setSelectedTab(tab);
      router.push(`${pathname}?${createQueryString("currentTab", tab)}`, {
        scroll: false,
      });
    },
    [pathname, router, createQueryString]
  );

  return { selectedTab, handleTabClick };
}