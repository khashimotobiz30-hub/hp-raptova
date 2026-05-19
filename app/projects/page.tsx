'use client';

import { useEffect } from 'react';

export default function ProjectsPage() {
  useEffect(() => {
    window.location.replace('/#projects');
  }, []);

  return null;
}
