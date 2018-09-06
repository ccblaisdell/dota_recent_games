import React from "react";
import Link from "next/link";
import { Col } from "./Layout";

export default function Nav() {
  return (
    <Col>
      <Link href="/">Recent</Link>{" "}
      <Link href="/stupocalypse2018">Stupocalypse2018</Link>{" "}
    </Col>
  );
}
