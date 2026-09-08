import * as esbuild from 'esbuild';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read package.json to get version info
const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'));

async function build() {
  try {
    // Bundle the speed-insights script
    await esbuild.build({
      entryPoints: ['speed-insights.js'],
      bundle: true,
      minify: true,
      format: 'iife',
      outfile: 'dist/speed-insights.min.js',
      platform: 'browser',
      target: ['es2015'],
      banner: {
        js: `/* Vercel Speed Insights - Built from @vercel/speed-insights v${packageJson.dependencies['@vercel/speed-insights']} */`,
      },
    });
    console.log('✅ Speed Insights built successfully to dist/speed-insights.min.js');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

build();
