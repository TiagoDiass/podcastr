export default function Home(props) {
  return (
    <>
      <h1>Página index </h1>
    </>
  );
}

export async function getStaticProps() {
  const response = await fetch('http://localhost:3333/episodes');
  const episodes = response.json();

  return {
    props: { episodes },
    revalidate: 60 * 60 * 8,
  };
}
