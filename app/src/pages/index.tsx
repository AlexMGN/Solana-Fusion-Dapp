import type { NextPage } from "next";
import Head from "next/head";
import { HomeView } from "../views";

const Home: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>OPCODES Exercice</title>
        <meta
          name="description"
          content="OPCODES Exercice"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;
