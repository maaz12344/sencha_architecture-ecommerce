
# ==========================================
# STAGE 1: Build Ext JS application
# ==========================================
FROM node:20-bookworm AS builder

# Install Java 17
RUN apt-get update && \
    apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH="${JAVA_HOME}/bin:${PATH}"

WORKDIR /app

# Copy dependency files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy application source
COPY . .

# Verify installed versions
RUN node --version && java -version

# Build Ext JS production application
RUN npm run build

# Verify production output
RUN test -f /app/build/production/ShopSphere/index.html


# ==========================================
# STAGE 2: Serve application using Nginx
# ==========================================
FROM nginx:alpine

# Copy production files from builder
COPY --from=builder /app/build/production/ShopSphere/ /usr/share/nginx/html/

# Copy Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 10000

CMD ["nginx", "-g", "daemon off;"]
