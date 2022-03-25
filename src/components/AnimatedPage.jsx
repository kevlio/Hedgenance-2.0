import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Container } from "@chakra-ui/react";

const pageMotion = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0, transition: { duration: 2 } },
  exit: { opacity: 0, x: 0, transition: { duration: 2 } },
};

function AnimatedPage({ children }) {
  return (
    <Container
      as={motion.div}
      maxWidth="container.lg"
      initial="initial"
      animate="animate"
      variants={pageMotion}
    >
      {children}
    </Container>
  );
}

export default AnimatedPage;
