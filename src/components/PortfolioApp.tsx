"use client";

import { Contact } from "./Contact";
import { Featured } from "./Featured";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
import { Modal } from "./Modal";
import { Nav } from "./Nav";
import { WorkGrid } from "./WorkGrid";
import { useModal } from "@/hooks/useModal";

export function PortfolioApp() {
  const { item, open, close } = useModal();

  return (
    <>
      <Nav />
      <main id="main-content">
        <Hero />
        <Featured onOpen={open} />
        <WorkGrid onOpen={open} />
        <Contact />
      </main>
      <Footer />
      <Modal item={item} onClose={close} />
    </>
  );
}
