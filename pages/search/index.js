export default function Search({}) {}

export async function getServerSideProps(context) {
  const { query } = context;
  const { search } = query;

  //   llamar a la api de algolia
  return {
    props: {},
  };
}
