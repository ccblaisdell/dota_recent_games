import React from "react";
import Link from "next/link";
import { Col } from "./Layout";

export default function Nav() {
  return (
    <Col>
      <Link href="/">
        <a>Recent</a>
      </Link>{" "}
      <Link href="/stupocalypse2018">
        <a>Stupocalypse2018</a>
      </Link>{" "}
    </Col>
  );
}
