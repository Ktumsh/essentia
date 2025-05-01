"use client";

import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    color: "#000",
    fontFamily: "Times-Roman",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  h1: {
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 24,
    marginBottom: 12,
  },
  h2: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  h3: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 18,
    marginBottom: 8,
  },
  p: {
    fontSize: 12,
    lineHeight: 1.625,
    marginBottom: 8,
  },
  ul: {
    marginBottom: 12,
    paddingLeft: 18,
  },
  ol: {
    marginBottom: 12,
    paddingLeft: 18,
  },
  li: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  bullet: {
    width: 6,
    marginRight: 6,
    transform: "translateY(-2px)",
  },
  listItemText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 1.625,
  },
  link: {
    color: "#2563eb",
    textDecoration: "underline",
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: "#d1d5db",
    marginVertical: 16,
  },
  strong: { fontWeight: "bold" },
  em: { fontStyle: "italic" },
  bqContainer: {
    flexDirection: "row",
    marginVertical: 8,
  },
  bqBar: {
    width: 4,
    backgroundColor: "#d1d5db",
  },
  bqContent: {
    flex: 1,
    paddingLeft: 8,
    color: "#6b7280",
  },
  code: {
    fontFamily: "Courier",
    fontSize: 10,
    backgroundColor: "#f3f4f6",
    padding: 2,
  },
});

interface GuidePdfDocumentProps {
  title: string;
  description: string;
  content: string;
}

export default function GuidePdfDocument({
  title,
  description,
  content,
}: GuidePdfDocumentProps) {
  return (
    <Document>
      <Page style={styles.page}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => <Text style={styles.h1}>{children}</Text>,
            h2: ({ children }) => <Text style={styles.h2}>{children}</Text>,
            h3: ({ children }) => <Text style={styles.h3}>{children}</Text>,
            p: ({ children }) => <Text style={styles.p}>{children}</Text>,
            ul: ({ children }) => <View style={styles.ul}>{children}</View>,
            ol: ({ children }) => <View style={styles.ol}>{children}</View>,
            li: ({ children }) => (
              <View style={styles.li}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.listItemText}>{children}</Text>
              </View>
            ),
            a: ({ href, children }) => (
              <Text
                style={styles.link}
                render={() => `${children} (${href})`}
              />
            ),
            hr: () => <View style={styles.hr} />,
            strong: ({ children }) => (
              <Text style={styles.strong}>{children}</Text>
            ),
            em: ({ children }) => <Text style={styles.em}>{children}</Text>,
            blockquote: ({ children }) => {
              const filtered = React.Children.toArray(children).filter(
                (child) => {
                  if (typeof child === "string") {
                    return child.trim().length > 0;
                  }
                  return true;
                },
              );

              return (
                <View style={styles.bqContainer}>
                  <View style={styles.bqBar} />
                  <View style={styles.bqContent}>
                    {filtered.map((child, i) => {
                      if (typeof child === "string") {
                        return (
                          <Text key={i} style={styles.p}>
                            {child}
                          </Text>
                        );
                      }
                      if (React.isValidElement(child)) {
                        return React.cloneElement(child, {
                          key: i,
                          ...(React.isValidElement(child) && child.type === Text
                            ? { style: styles.p }
                            : {}),
                        });
                      }
                      return null;
                    })}
                  </View>
                </View>
              );
            },
            code: ({ children }) => <Text style={styles.code}>{children}</Text>,
          }}
        >
          {content}
        </ReactMarkdown>
        <View style={{ marginTop: 24 }}>
          <Text style={{ fontSize: 10 }}>
            Visita{" "}
            <Link
              src="https://www.essentia.plus"
              style={{
                color: "#2563eb",
                textDecoration: "underline",
              }}
            >
              Essentia
            </Link>{" "}
            para más recursos de salud y bienestar.
          </Text>
        </View>
      </Page>
    </Document>
  );
}
