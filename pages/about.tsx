import React, { useCallback, useState } from "react";
import { useRouter } from 'next/router'

import AboutLayout from "components/layouts/AboutLayout";
import Button from "components/Button";
import { useLogin } from "utils/api";
import Logo from "components/toolbar/Logo";
import { APPLICATION_NAME } from "utils/meta";

const Page = () => {
  

  return (
    <AboutLayout>
      <Logo />
      <br />
      <h1>{APPLICATION_NAME}</h1>
      [ˈtēk]
      <p>Task management on your own terms</p>
      <p>Teaque is a small, focused task management application that is designed to not stress you out.</p>
      
      <h2>Guiding principles</h2>
      <h3>Open &amp; Open Source</h3>
      <h3>Ubiquitous</h3>
      <h3>Made for me</h3>
      Teaque is fairly opinionated. I did not find the perfect task manager for myself, so I build one incorporating everything that I liked about other task managers. It may not be for you, and that's okay.

      <h2>Concepts</h2>

      <h3>Projects</h3>
      Projects, just as Tasks, can be scheduled and completed.
      
      <Button >Try it</Button>
    </AboutLayout>
  );
};

export default Page;
