# --------------------------------------------------------------
# Base image – Ubuntu 22.04 + common dev tools
# --------------------------------------------------------------
FROM mcr.microsoft.com/vscode/devcontainers/base:ubuntu-22.04

# --------------------------------------------------------------
# Install dependencies needed by the Android build tools
# --------------------------------------------------------------
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive && \
    apt-get install -y --no-install-recommends \
      curl git unzip xz-utils zip libglu1-mesa sudo openjdk-11-jdk && \
    rm -rf /var/lib/apt/lists/*

# --------------------------------------------------------------
# Install the Flutter SDK (stable channel)
# --------------------------------------------------------------
ENV FLUTTER_VERSION=3.19.0
ENV FLUTTER_HOME=/opt/flutter
RUN git clone https://github.com/flutter/flutter.git ${FLUTTER_HOME} \
    && cd ${FLUTTER_HOME} && git checkout ${FLUTTER_VERSION}
ENV PATH="${FLUTTER_HOME}/bin:${FLUTTER_HOME}/bin/cache/dart-sdk/bin:${PATH}"

# --------------------------------------------------------------
# Accept Android licenses (required for `flutter doctor`)
# --------------------------------------------------------------
RUN yes | flutter doctor --android-licenses

# --------------------------------------------------------------
# Run flutter doctor once so it caches the required binaries
# --------------------------------------------------------------
RUN flutter doctor -v

# --------------------------------------------------------------
# Set a non‑root user (the same one VS Code uses)
# --------------------------------------------------------------
ARG USERNAME=vscode
ARG USER_UID=1000
ARG USER_GID=$USERNAME
RUN groupadd --gid $USER_GID $USERNAME \
    && useradd -s /bin/bash --uid $USER_UID --gid $USER_GID -m $USERNAME \
    && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
    && chmod 0440 /etc/sudoers.d/$USERNAME
USER $USERNAME

# --------------------------------------------------------------
# Set the workdir to /workspaces (where the repo will be mounted)
# --------------------------------------------------------------
WORKDIR /workspaces/${PWD##*/}
