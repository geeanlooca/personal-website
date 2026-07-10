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

A pure Python implementation of some mathematical models for the computation of the nonlinear interference noise accumulating during the transmission of light in optical fibers. Code is automatically dockerized and Singularity-ized (?) in the CI/CD pipeline, and pushed to GitHub's container registry. It is then a lot easier in the HPC environment to simply pull the image and run it, instead of building it locally without root access, or, even worse, building it on my personal machine and uploading gigabytes of data with my sub-par internet connection.

[Source code](https://github.com/geeanlooca/PyNLIN).

Publications derived from this project:

1. F. Lorenzi, G. Marcon et al., ["Model for Nonlinear Interference Noise in Raman-amplified WDM Systems,"](https://ieeexplore.ieee.org/abstract/document/9979292/metrics#metrics) 2022 European Conference on Optical Communication (ECOC), Basel, Switzerland, 2022, pp. 1-4
2. F. Lorenzi, G. Marcon et al., ["Nonlinear Interference Noise in Raman-Amplified WDM Systems,"](https://doi.org/10.1109/JLT.2023.3287650) in Journal of Lightwave Technology, vol. 41, no. 20, pp. 6465-6473, 15 Oct.15, 2023

---

# LastTip

This is a fun little project that was born with me realizing that the music obsessed person that I once was, the one that would spend nights searching for obscure bands and new genres, has been replaced by the Spotify algorithm. With this, a lot of the music that I once listened to has been left aside collecting digital dust. Fortunately, I have been tracking all the music I listen to on [last.fm](https://last.fm/) since 2009.

I built a small application that connects to my last.fm and spotify libraries to get some music recommendations. You can get some at [this link](https://lasttip.gianlucamarcon.com). Or go directly to my [last.fm profile](https://last.fm/user/FireIsTheLeader).

[Source code](https://github.com/geeanlooca/lasttip).

---

# Convolutional and Turbo Codes for deep-space communications

A C implementation of the [CCSDS](https://public.ccsds.org/default.aspx) (Consultative Committee for Space Data Systems) standard for [Turbo Codes](https://en.wikipedia.org/wiki/Turbo_code), a class of high-performance error-correction codes used in deep-space communications.
The implementation includes a library that handles the main building blocks of a turbo code: convolutional codes, interleavers, encoders, and their decoding algorithms. [Viterbi](https://en.wikipedia.org/wiki/Viterbi_algorithm) and [BCJR](https://en.wikipedia.org/wiki/BCJR_algorithm) algorithms are used for the decoding of convolutional codes, but are also used in the decoding algorithm for turbo codes.
A few programs and scripts to benchmark them are also included.

The source code is available on [GitHub](https://github.com/geeanlooca/deepspace-turbo) along with some benchmark results.

---

# Wireless MAC protocols simulator

The scope of this project is to compare different channel access policies in wireless networks.
It consists of an discrete-event network simulator written in Java that simulates a wireless channel with a given number of transmitters/receivers.
The IEEE 802.11 MAC protocol controls the access to the channel with a [Distributed coordination function (DCF)](https://en.wikipedia.org/wiki/Distributed_coordination_function) [3], but some alternatives have been proposed in the literature. Here the DCF is compared to two new approaches with constant-time medium access resolution.

A fun project that covers a lot of different topics: software engineering, numerical optimization and wireless communications.

Source code and report available on [GitHub](https://github.com/geeanlooca/wsn-simulator).
