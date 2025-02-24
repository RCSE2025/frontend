import { cn } from '@/lib/utils'
import { Container } from './container'

interface Props {
  className?: string
}

export const Header: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
  return (
    <header className={cn('border border-b', className)}>
      <Container className="flex items-center justify-between py-2 mx-5 xl:mx-[auto] flex-col md:flex-row gap-5 md:gap-[auto]">
        {children}
      </Container>
    </header>
  )
}
