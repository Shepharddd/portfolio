import Image from "next/image";
import Header from "./Header/Header";
import About from "./About/about";
import Layout from "./layout";

export default function Home({
  child,
}: {
  child: React.ReactNode;
}) {
  return (
    <div>
        {child ?? <About />}
    </div>
  );
}
