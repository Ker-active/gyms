"use client";
import { createContext, useContext } from "react";
import { z, ZodObject, ZodEffects } from "zod";

type SchemaType = ZodObject<any> | ZodEffects<ZodObject<any>>;

const FormSchemaContext = createContext<ZodObject<any> | null>(null);

export const FormSchemaProvider = ({ schema, children }: { schema: SchemaType; children: React.ReactNode }) => {
  // Extract inner schema if it is ZodEffects
  const baseSchema = schema instanceof ZodEffects ? schema._def.schema : schema;

  return <FormSchemaContext.Provider value={baseSchema}>{children}</FormSchemaContext.Provider>;
};

export const useFormSchema = () => {
  const context = useContext(FormSchemaContext);
  // if (!context) {
  //   throw new Error("useFormSchema must be used within a FormSchemaProvider");
  // }
  return context;
};
