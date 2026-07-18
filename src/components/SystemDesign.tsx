'use client';

import React from 'react';
import { GitFork, ArrowRight, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SystemDesign() {
  return (
    <div className="mt-8 flex flex-col gap-10">
      
      {/* Responsive Architecture SVG Diagram */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.98, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-slate-50 dark:bg-slate-950/40 rounded-[24px_8px_24px_12px] p-6 md:p-8 border border-slate-200/50 dark:border-slate-850 shadow-xs mb-0"
      >
        <div className="flex items-center gap-2 mb-6 font-mono text-[9.5px] text-slate-500 select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 animate-pulse" />
          <span>MICROSERVICES TOPOLOGY &amp; SERVICE DISCOVERY</span>
        </div>

        <div className="w-full overflow-x-auto">
          <svg 
            viewBox="0 0 800 400" 
            className="w-full min-w-[750px] text-slate-800 dark:text-slate-200"
            style={{ maxHeight: '420px' }}
          >
            {/* Definitions for arrow markers */}
            <defs>
              <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="#3b82f6" />
              </marker>
            </defs>

            {/* Node 1: Client Application (React SPA) */}
            <rect x="15" y="160" width="130" height="70" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-250 dark:stroke-slate-800" strokeWidth="1.5" />
            <text x="80" y="190" textAnchor="middle" className="font-sans font-bold text-[11px] fill-slate-900 dark:fill-white">React Frontend</text>
            <text x="80" y="205" textAnchor="middle" className="font-mono text-[8px] fill-slate-500">SPA Dashboard (Axios)</text>

            {/* Flow line Client -> Gateway */}
            <path d="M 145 195 L 205 195" fill="none" stroke="#3b82f6" strokeWidth="1.5" markerEnd="url(#arrow)" strokeDasharray="5 5">
              <animate attributeName="stroke-dashoffset" values="10;0" dur="1s" repeatCount="indefinite" />
            </path>
            <text x="175" y="185" textAnchor="middle" className="font-mono text-[7px] fill-blue-500 font-bold">Port 8080</text>

            {/* Node 2: Spring Cloud API Gateway */}
            <rect x="215" y="90" width="150" height="210" rx="10" className="fill-blue-50/10 dark:fill-blue-950/10 stroke-blue-500/30" strokeWidth="2" />
            <text x="290" y="120" textAnchor="middle" className="font-sans font-bold text-xs fill-blue-650 dark:fill-blue-400">Spring Cloud Gateway</text>
            <text x="290" y="140" textAnchor="middle" className="font-mono text-[8px] fill-slate-550">&bull; Central Entry Point</text>
            <text x="290" y="160" textAnchor="middle" className="font-mono text-[8px] fill-slate-550">&bull; JWT Security Filter</text>
            <text x="290" y="180" textAnchor="middle" className="font-mono text-[8px] fill-slate-550">&bull; Dynamic Routing</text>
            <text x="290" y="200" textAnchor="middle" className="font-mono text-[8px] fill-slate-550">&bull; CORS Handler</text>
            <text x="290" y="220" textAnchor="middle" className="font-mono text-[8px] fill-slate-550">&bull; Eureka Registry Client</text>

            {/* Discovery interactions with Eureka */}
            <path d="M 290 90 L 290 60 L 460 60" fill="none" stroke="#6b7280" strokeWidth="1" strokeDasharray="2 2" />
            <path d="M 460 70 L 415 70" fill="none" stroke="#6b7280" strokeWidth="1" markerEnd="url(#arrow)" />
            <text x="365" y="52" textAnchor="middle" className="font-mono text-[7px] fill-slate-500">Service Lookup</text>

            {/* Node 3: Eureka Server (Service Registry) */}
            <rect x="470" y="30" width="150" height="60" rx="8" className="fill-slate-900 dark:fill-slate-950 stroke-slate-700" strokeWidth="1.5" />
            <text x="545" y="55" textAnchor="middle" className="font-sans font-bold text-[10px] fill-slate-200">Eureka Registry Server</text>
            <text x="545" y="70" textAnchor="middle" className="font-mono text-[8px] fill-slate-500">Port 8761 discovery</text>

            {/* Gateway to Domain Services Flows */}
            <path d="M 365 140 L 460 140" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
            </path>
            <path d="M 365 195 L 460 195" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
            </path>
            <path d="M 365 250 L 460 250" fill="none" stroke="#3b82f6" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="4 4">
              <animate attributeName="stroke-dashoffset" values="8;0" dur="1.2s" repeatCount="indefinite" />
            </path>

            {/* Domain Service 1: Machine Service */}
            <rect x="470" y="110" width="140" height="50" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-250 dark:stroke-slate-800" strokeWidth="1.5" />
            <text x="540" y="130" textAnchor="middle" className="font-sans font-bold text-[10px] fill-slate-900 dark:fill-white">machine-service</text>
            <text x="540" y="145" textAnchor="middle" className="font-mono text-[7px] fill-slate-550">Port 8081 • Machine Master</text>

            {/* Domain Service 2: Production Service */}
            <rect x="470" y="170" width="140" height="50" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-250 dark:stroke-slate-800" strokeWidth="1.5" />
            <text x="540" y="190" textAnchor="middle" className="font-sans font-bold text-[10px] fill-slate-900 dark:fill-white">production-service</text>
            <text x="540" y="205" textAnchor="middle" className="font-mono text-[7px] fill-slate-550">Port 8083 • Order Workflow</text>

            {/* Domain Service 3: Quality Service */}
            <rect x="470" y="230" width="140" height="50" rx="8" className="fill-white dark:fill-slate-900 stroke-slate-250 dark:stroke-slate-800" strokeWidth="1.5" />
            <text x="540" y="250" textAnchor="middle" className="font-sans font-bold text-[10px] fill-slate-900 dark:fill-white">quality-service</text>
            <text x="540" y="265" textAnchor="middle" className="font-mono text-[7px] fill-slate-550">Port 8084 • Quality Check</text>

            {/* Inter-service call: Production -> Machine (WebClient) */}
            <path d="M 540 170 L 540 160" fill="none" stroke="#ef4444" strokeWidth="1" markerEnd="url(#arrow)" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="6;0" dur="0.8s" repeatCount="indefinite" />
            </path>
            <text x="575" y="168" textAnchor="middle" className="font-mono text-[6px] fill-red-500 font-bold">WebClient Call</text>

            {/* Connections to Database domain schemas */}
            <path d="M 610 135 L 680 135" fill="none" stroke="#6b7280" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="6;0" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M 610 195 L 680 195" fill="none" stroke="#6b7280" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="6;0" dur="1s" repeatCount="indefinite" />
            </path>
            <path d="M 610 255 L 680 255" fill="none" stroke="#6b7280" strokeWidth="1.2" markerEnd="url(#arrow)" strokeDasharray="3 3">
              <animate attributeName="stroke-dashoffset" values="6;0" dur="1s" repeatCount="indefinite" />
            </path>

            {/* Isolated DB schemas */}
            <rect x="690" y="115" width="90" height="40" rx="6" className="fill-slate-900 dark:fill-slate-950 stroke-indigo-500/20" strokeWidth="1" />
            <text x="735" y="130" textAnchor="middle" className="font-sans font-bold text-[9px] fill-indigo-400">machine-db</text>
            <text x="735" y="142" textAnchor="middle" className="font-mono text-[7px] fill-slate-600">Postgres</text>

            <rect x="690" y="175" width="90" height="40" rx="6" className="fill-slate-900 dark:fill-slate-950 stroke-indigo-500/20" strokeWidth="1" />
            <text x="735" y="190" textAnchor="middle" className="font-sans font-bold text-[9px] fill-indigo-400">production-db</text>
            <text x="735" y="202" textAnchor="middle" className="font-mono text-[7px] fill-slate-600">Postgres</text>

            <rect x="690" y="235" width="90" height="40" rx="6" className="fill-slate-900 dark:fill-slate-950 stroke-indigo-500/20" strokeWidth="1" />
            <text x="735" y="250" textAnchor="middle" className="font-sans font-bold text-[9px] fill-indigo-400">quality-db</text>
            <text x="735" y="262" textAnchor="middle" className="font-mono text-[7px] fill-slate-600">Postgres</text>
          </svg>
        </div>
      </motion.div>

      {/* Deep Tradeoffs and Technical Lessons Breakdown */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-8 md:grid-cols-2"
      >
        
        {/* Column 1: Tradeoffs and Choices */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
            <GitFork className="h-5 w-5 text-indigo-500" />
            <span>Architectural Tradeoffs</span>
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-850 text-xs leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Centralized common-security Module vs. Individual Validation</strong>
              <p className="text-slate-500 dark:text-slate-400">
                Developed a shared maven dependency `common-security` grouping JWT filters, token parsing utilities, and authorization roles. While this creates a library dependency between domains, it enforces a single source of truth for user access matrices and security configurations, reducing duplicate filter setups by 80%.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-850 text-xs leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Database Per Service Schema Separation</strong>
              <p className="text-slate-500 dark:text-slate-400">
                Enforced database-per-service using three independent PostgreSQL schemas (`machine-db`, `production-db`, `quality-db`). This eliminates shared table lock bottlenecks and guarantees domain isolation, meaning if the quality inspections logging database hits storage limits, the core production line queue remains online.
              </p>
            </div>
          </div>
        </div>

        {/* Column 2: Lessons and Post-mortem failures */}
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            <span>Post-Mortem &amp; Next-Gen Steps</span>
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-850 text-xs leading-relaxed">
              <strong className="text-slate-900 dark:text-slate-200 block mb-1">Cascading Failures &amp; Resilience4j Fallbacks</strong>
              <p className="text-slate-500 dark:text-slate-400">
                During microservice cold starts, calling the load-balanced `WebClient` from `production-service` to check machine availability resulted in socket time-outs and crashed production workflows. Resolved this cascading issue by implementing `Resilience4j` circuit breakers with a cached fallback state that keeps orders submittable during service recovery windows.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-50/50 dark:bg-slate-900/40 border border-slate-200/40 dark:border-slate-850 text-xs leading-relaxed">
              <strong className="text-indigo-650 dark:text-indigo-400 block mb-1 flex items-center gap-1 font-mono uppercase tracking-wider text-[10px]">
                <span>Future Design Shift: Asynchronous Websockets Gateway</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </strong>
              <p className="text-slate-500 dark:text-slate-400">
                To achieve live machine progress, the current dashboard relies on browser-side simulation loops synced periodically back to endpoints. Transitioning to a central Spring Cloud WebSocket gateway would push live machine telemetry dynamically, reducing HTTP request poll loads on Tomcat thread pools under high machine counts.
              </p>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  );
}
