FROM ruby:4.0-slim-trixie
WORKDIR /ruby

# Install Chrome browser
## Install Dependencies
RUN apt-get update && apt-get install -y gnupg wget --no-install-recommends

## Download Google Chrome Signing key and save to key ring
RUN wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | \
    gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg

## Add Chrome to registry
RUN sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'

## Update and install Chrome
RUN apt-get update && apt-get install -y google-chrome-stable --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Update and install build essentials and ruby headers
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    ruby-dev \
    && rm -rf /var/lib/apt/lists/*

# Copy Gemfile and install gems
COPY ./Gemfile* ./
RUN gem install bundler:4.0.6
RUN bundle install

# Copy Test Code
COPY spec_helper.rb spec_helper.rb
COPY ./encrypted_data/ ./encrypted_data/
COPY ./helpers/ ./helpers/
COPY ./lib/ ./lib/
COPY ./page_objects/ ./page_objects/
COPY ./specs/ ./specs/