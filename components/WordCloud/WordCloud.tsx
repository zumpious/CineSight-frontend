'use client';
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import cloud from 'd3-cloud';
import { WordCloudProps, Word } from './WordCloud.types';

export default function WordCloud({ words }: WordCloudProps) {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const entries = Object.entries(words);
    const maxCount = Math.max(...entries.map(([_, [__, count]]) => count));
    const maxFreq = Math.max(...entries.map(([_, [freq, __]]) => freq));

    const wordData: Word[] = entries.map(([text, [frequency, count]]) => {
      const freqWeight = frequency / maxFreq;
      const countWeight = count / maxCount;
      const combinedWeight = (freqWeight + countWeight) / 2;
      
      return {
        text,
        size: Math.max(12, Math.min(50, Math.pow(combinedWeight, 0.7) * 80)),
        value: count,
        frequency: frequency
      };
    });

    wordData.sort((a, b) => b.size - a.size);

    const width = 600;
    const height = 400;

    const layout = cloud<Word>()
      .size([width, height])
      .words(wordData)
      .padding(2)
      .rotate(() => 0)
      .fontSize((d: Word) => d.size)
      .spiral('archimedean')
      .on("end", draw);

    function draw(words: Word[]) {
      const svg = d3.select(svgRef.current)
        .attr("width", "100%")
        .attr("height", height)
        .attr("viewBox", `0 0 ${width} ${height}`);

      const g = svg.append("g")
        .attr("transform", `translate(${width/2},${height/2})`);

      const colorScale = d3.scaleSequential()
        .domain([0, d3.max(words, d => d.frequency) || 1])
        .interpolator(d3.interpolateBlues);

      g.selectAll("text")
        .data(words)
        .enter().append("text")
        .style("font-size", (d: Word) => `${d.size}px`)
        .style("font-family", "system-ui")
        .style("fill", (d: Word) => colorScale(d.frequency))
        .style("cursor", "pointer")
        .attr("text-anchor", "middle")
        .attr("transform", (d: Word) => `translate(${d.x},${d.y})`)
        .text((d: Word) => d.text)
        .append("title")
        .text((d: Word) => `${d.text}\nFrequency: ${(d.frequency * 100).toFixed(2)}%\nCount: ${d.value}`);
    }

    layout.start();
  }, [words]);

  return (
    <div>
      <svg ref={svgRef} className="w-full" preserveAspectRatio="xMidYMid meet" />
    </div>
  );
}