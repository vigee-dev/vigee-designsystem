import {
  Collapsible as CollapsibleWrapper,
  CollapsibleContent,
  CollapsibleTrigger
} from "@/app/components/vigee-designsystem/components/ui/collapsible";
import React, {useState} from "react";

interface CollapsibleProps {
  defaultOpen?: boolean
  className: string
  children: React.ReactNode
  trigger: React.ReactNode
}

const Collapsible = ({trigger, children, className, defaultOpen = false}: CollapsibleProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <CollapsibleWrapper open={isOpen} onOpenChange={setIsOpen} className={className}>
      <CollapsibleTrigger asChild><div>{trigger}</div></CollapsibleTrigger>
      <CollapsibleContent className="space-y-2">{children}</CollapsibleContent>
    </CollapsibleWrapper>
  )
}

export default Collapsible
