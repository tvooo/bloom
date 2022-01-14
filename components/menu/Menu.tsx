import React, { ReactNode, useEffect, useRef, useState } from "react";
import { styled } from "@linaria/react";
import Button from "components/Button";
import { AnimatePresence, motion } from "framer-motion";

const Popover = styled.div`
  position: absolute;
  z-index: 500;
  top: 100%;
  right: 0;
`;

const MenuWrapper = styled.ul`
  background: white;
  box-shadow: 0 0 10px 10px rgba(0, 0, 0, 0.05);
  border-radius: var(--space-xs);
  padding: var(--space-xs);
  width: 200px;

  font-size: var(--font-size-sm);
  line-height: var(--line-height-sm);
`;

const TriggerWrapper = styled.div`
  position: relative;
`;

interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
}
const Menu: React.FC<MenuProps> = ({ trigger, children }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  
  const closeOnOutsideClick = (event: MouseEvent) => {
    event.stopPropagation();
    
    const { current: menuElement } = menuRef;
    if (!menuElement) return;
    const targetElement = event.target as Node;
    const isClickOutsideMenu = !menuElement.contains(targetElement);
    if (!isClickOutsideMenu) return;

    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("click", closeOnOutsideClick);
      return () => document.removeEventListener("click", closeOnOutsideClick);
    }
  }, [open]);
  return (
    <>
      <TriggerWrapper>
        <Button onClick={() => setOpen(true)} ref={triggerRef}>
          {trigger}
        </Button>

        <AnimatePresence>
        {open && (
          <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
        >

        <Popover ref={menuRef}>
            <MenuWrapper>{children}</MenuWrapper>
          </Popover>
          </motion.div>
          )}
          </AnimatePresence>
      </TriggerWrapper>
    </>
  );
};

export default Menu;
