---
layout: page.njk
title: Projects
tags: nav
navOrder: 3
permalink: "/projects/"
---

Here is a compilation of my personal projects, created for various reasons, whether for enjoyment, academic pursuits, or a blend of both.

---

# Numerical solver for space-division-multiplexed optical fiber transmission

<div class="graphic inline-r">
  <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="45" class="stroke-muted" stroke-width="1" opacity="0.5"/>
    <g style="transform-origin:60px 60px; animation:spin-slow 20s linear infinite">
      <g transform="translate(60,60)">
        <g transform="rotate(0)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(45)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(90)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(135)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(180)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(225)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(270)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
        <g transform="rotate(315)"><line x1="0" y1="-28" x2="0" y2="-18" class="stroke-accent" stroke-width="1.5"/><polygon points="-3,-20 0,-15 3,-20" class="fill-accent"/></g>
      </g>
    </g>
    <circle cx="60" cy="60" r="3" class="fill-accent"/>
  </svg>
</div>

Project done for my PhD program involving the simulation of light transmission in [few-mode optical fibers](https://www.rp-photonics.com/few_mode_fibers.html) under the effect of [optical nonlinearities](https://www.rp-photonics.com/tutorial_passive_fiber_optics11.html), namely Kerr and Raman amplification.
The purpose was to study the effect of random birefringence on the properties of Raman amplification for this new type of optical fibers.

The results have been published in this paper:

-  Gianluca Marcon, Andrea Galtarossa, Luca Palmieri, and Marco Santagiustina, ["Influence of birefringence- and core ellipticity-induced mode coupling on the gain statistics of forward-pumped Raman amplified few-mode fiber links,"](https://doi.org/10.1364/OE.459381) Opt. Express 30, 40101-40119 (2022), 


The project contains Python and MATLAB scripts for:

1. Running the physics simulation using [COMSOL](https://www.comsol.com/) to extract the fiber modes given the fiber index profile
2. Processing the mode profiles and computing the overlap integrals to determine linear and nonlinear coupling coefficients
3. Running the experiments and collecting results for many random birefringence processes

The heavy lifting, i.e. the code for solving the nonlinear coupled differential equations using a [split-step algorithm](https://en.wikipedia.org/wiki/Split-step_method), is implemented in C++ with the [Intel oneAPI Math Kernel Library (MKL)](https://www.intel.com/content/www/us/en/developer/tools/oneapi/onemkl.html) and compiled in a python module using the [`pybind11`](https://github.com/pybind/pybind11) library.

Finally, the code is packaged and run on a HPC cluster using [Singularity containers](https://docs.sylabs.io/guides/3.5/user-guide/introduction.html).

[Source code](https://github.com/geeanlooca/sdm-propane).

---


# PyNLIN

<div class="graphic wide">
  <svg viewBox="0 0 400 80" fill="none">
    <path d="M40,65 C50,65 55,25 60,25 C65,25 70,65 80,65" class="stroke-accent" stroke-width="1.5" style="transform-origin:60px 65px; animation:pulse-propagate 5s ease-out infinite"/>
  </svg>
</div>

A pure Python implementation of some mathematical models for the computation of the nonlinear interference noise accumulating during the transmission of light in optical fibers. Code is automatically dockerized and Singularity-ized (?) in the CI/CD pipeline, and pushed to GitHub's container registry. It is then a lot easier in the HPC environment to simply pull the image and run it, instead of building it locally without root access, or, even worse, building it on my personal machine and uploading gigabytes of data with my sub-par internet connection.

[Source code](https://github.com/geeanlooca/PyNLIN).

Publications derived from this project:

1. F. Lorenzi, G. Marcon et al., ["Model for Nonlinear Interference Noise in Raman-amplified WDM Systems,"](https://ieeexplore.ieee.org/abstract/document/9979292/metrics#metrics) 2022 European Conference on Optical Communication (ECOC), Basel, Switzerland, 2022, pp. 1-4
2. F. Lorenzi, G. Marcon et al., ["Nonlinear Interference Noise in Raman-Amplified WDM Systems,"](https://doi.org/10.1109/JLT.2023.3287650) in Journal of Lightwave Technology, vol. 41, no. 20, pp. 6465-6473, 15 Oct.15, 2023

---

# LastTip

<div class="graphic inline-l">
  <svg viewBox="0 0 120 80" fill="none">
    <g style="animation:wave-drift 8s linear infinite">
      <path d="M0,40 Q10,15 20,40 T40,40 T60,40 T80,40 T100,40 T120,40 T140,40" class="stroke-accent" stroke-width="1.5" stroke-linecap="round" opacity="0.7"/>
    </g>
    <g style="animation:wave-drift 8s linear infinite; animation-delay:2s; opacity:0.4">
      <path d="M0,40 Q10,20 20,40 T40,40 T60,40 T80,40 T100,40 T120,40 T140,40" class="stroke-accent" stroke-width="1.2" stroke-linecap="round"/>
    </g>
  </svg>
</div>

This is a fun little project that was born with me realizing that the music obsessed person that I once was, the one that would spend nights searching for obscure bands and new genres, has been replaced by the Spotify algorithm. With this, a lot of the music that I once listened to has been left aside collecting digital dust. Fortunately, I have been tracking all the music I listen to on [last.fm](https://last.fm/) since 2009.

I built a small application that connects to my last.fm and spotify libraries to get some music recommendations. You can get some at [this link](https://lasttip.gianlucamarcon.com). Or go directly to my [last.fm profile](https://last.fm/user/FireIsTheLeader).

[Source code](https://github.com/geeanlooca/lasttip).

---

# Convolutional and Turbo Codes for deep-space communications

<div class="graphic inline-r">
  <svg viewBox="10 0 100 70" fill="none">
    <g transform="rotate(18, 60, 20)">
      <!-- Satellite body -->
      <rect x="52" y="8" width="16" height="10" rx="2" class="stroke-accent" stroke-width="1.5"/>
      <rect x="34" y="10" width="14" height="6" class="stroke-accent" stroke-width="1"/>
      <rect x="72" y="10" width="14" height="6" class="stroke-accent" stroke-width="1"/>
      <circle cx="60" cy="22" r="2" class="fill-accent"/>
      <!-- Directional wavefronts (90° FOV downward) -->
      <path d="M70,35 A 14,14 0 0,1 50,35" class="stroke-accent" stroke-width="1.5" opacity="0.3" style="animation:mode-pulse 3s ease-in-out infinite"/>
      <path d="M80,45 A 28,28 0 0,1 40,45" class="stroke-accent" stroke-width="1.5" opacity="0.3" style="animation:mode-pulse 3s ease-in-out infinite; animation-delay:1s"/>
      <path d="M90,55 A 42,42 0 0,1 30,55" class="stroke-accent" stroke-width="1.5" opacity="0.3" style="animation:mode-pulse 3s ease-in-out infinite; animation-delay:2s"/>
    </g>
  </svg>
</div>

A C implementation of the [CCSDS](https://public.ccsds.org/default.aspx) (Consultative Committee for Space Data Systems) standard for [Turbo Codes](https://en.wikipedia.org/wiki/Turbo_code), a class of high-performance error-correction codes used in deep-space communications.
The implementation includes a library that handles the main building blocks of a turbo code: convolutional codes, interleavers, encoders, and their decoding algorithms. [Viterbi](https://en.wikipedia.org/wiki/Viterbi_algorithm) and [BCJR](https://en.wikipedia.org/wiki/BCJR_algorithm) algorithms are used for the decoding of convolutional codes, but are also used in the decoding algorithm for turbo codes.
A few programs and scripts to benchmark them are also included.

The source code is available on [GitHub](https://github.com/geeanlooca/deepspace-turbo) along with some benchmark results.

---

# Wireless MAC protocols simulator

<div class="graphic inline-l">
  <svg viewBox="0 0 120 100" fill="none">
    <!-- Links -->
    <line x1="22" y1="32" x2="92" y2="18" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="22" y1="32" x2="58" y2="58" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="22" y1="32" x2="18" y2="76" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="92" y1="18" x2="58" y2="58" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="92" y1="18" x2="88" y2="72" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="58" y1="58" x2="18" y2="76" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="58" y1="58" x2="88" y2="72" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <line x1="18" y1="76" x2="88" y2="72" class="stroke-muted" stroke-width="0.8" opacity="0.4"/>
    <!-- Node 1 -->
    <circle cx="22" cy="32" r="2.5" class="fill-accent"/>
    <circle cx="22" cy="32" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite"/>
    <circle cx="22" cy="32" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:1.2s"/>
    <!-- Node 2 -->
    <circle cx="92" cy="18" r="2.5" class="fill-accent"/>
    <circle cx="92" cy="18" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:0.6s"/>
    <circle cx="92" cy="18" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:1.8s"/>
    <!-- Node 3 -->
    <circle cx="58" cy="58" r="2.5" class="fill-accent"/>
    <circle cx="58" cy="58" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:0.3s"/>
    <circle cx="58" cy="58" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:1.5s"/>
    <!-- Node 4 -->
    <circle cx="18" cy="76" r="2.5" class="fill-accent"/>
    <circle cx="18" cy="76" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:0.9s"/>
    <circle cx="18" cy="76" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:2.1s"/>
    <!-- Node 5 -->
    <circle cx="88" cy="72" r="2.5" class="fill-accent"/>
    <circle cx="88" cy="72" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:0.0s"/>
    <circle cx="88" cy="72" r="3" class="stroke-accent" stroke-width="1" fill="none" opacity="0.5" style="animation:signal-radiate 2.5s ease-out infinite; animation-delay:1.0s"/>
  </svg>
</div>

The scope of this project is to compare different channel access policies in wireless networks.
It consists of an discrete-event network simulator written in Java that simulates a wireless channel with a given number of transmitters/receivers.
The IEEE 802.11 MAC protocol controls the access to the channel with a [Distributed coordination function (DCF)](https://en.wikipedia.org/wiki/Distributed_coordination_function) [3], but some alternatives have been proposed in the literature. Here the DCF is compared to two new approaches with constant-time medium access resolution.

A fun project that covers a lot of different topics: software engineering, numerical optimization and wireless communications.

Source code and report available on [GitHub](https://github.com/geeanlooca/wsn-simulator).
