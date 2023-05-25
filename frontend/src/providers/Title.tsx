import { createContext, useContext, useEffect, useState } from 'react';

export interface TitleState {
  title: string;
  canGoBack?: boolean;
}

export interface TitleContextProps extends TitleState {
  updateTitle: (title: string, canGoBack?: boolean) => void;
}

export const TitleContext = createContext<TitleContextProps>({
  title: '',
  canGoBack: false,
  updateTitle() {
    return;
  },
});

const TitleProvider = ({ children }: React.PropsWithChildren) => {
  const [title, setTitle] = useState('');
  const [canGoBack, setCanGoBack] = useState(false);

  function updateTitle(title: string, canGoBack?: boolean) {
    setTitle(title);
    setCanGoBack(canGoBack || false);
  }

  return <TitleContext.Provider value={{ title, canGoBack, updateTitle }}>{children}</TitleContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTitle = ({ title, canGoBack }: Partial<TitleState>): TitleState => {
  const context = useContext(TitleContext);

  if (!context) {
    throw new Error('useTitle должен использоваться внутри TitleProvider');
  }

  const { updateTitle } = context;

  useEffect(() => {
    if (!title) return;

    const documentDefined = typeof document !== 'undefined';

    if (!documentDefined) return;

    const originalTitle = document.title;

    if (document.title !== title) {
      updateTitle(title, canGoBack);
      document.title = title;
    }

    return () => {
      if (document.title === title) {
        updateTitle(originalTitle);
        document.title = originalTitle;
      }
    };
  }, [title, canGoBack, updateTitle]);

  return { title: title || document.title, canGoBack: canGoBack ?? context.canGoBack };
};

export default TitleProvider;
