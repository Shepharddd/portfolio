import About from "./About/about";

export default function Home({
  params,
  searchParams
}: {
  params?: any
  searchParams?: any
}): React.ReactElement {
  console.log(params);
  return (
    <div>
        <About />
    </div>
  );
}
