--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Debian 16.4-1.pgdg120+1)
-- Dumped by pg_dump version 16.4 (Debian 16.4-1.pgdg120+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

DROP DATABASE IF EXISTS customer_management_api_test;
--
-- Name: customer_management_api_test; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE customer_management_api_test WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE customer_management_api_test OWNER TO postgres;

\connect customer_management_api_test

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- --
-- -- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
-- --
--
-- DROP SCHEMA public CASCADE;
-- CREATE SCHEMA public;
--
--
-- ALTER SCHEMA public OWNER TO pg_database_owner;
--
-- --
-- -- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
-- --
--
-- COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: Role; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Role" AS ENUM (
    'guest',
    'admin'
    );


ALTER TYPE public."Role" OWNER TO postgres;

--
-- Name: Type; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."Type" AS ENUM (
    'individual',
    'business',
    'government',
    'institution'
    );


ALTER TYPE public."Type" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Address; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Address"
(
    id             integer NOT NULL,
    "countryId"    integer NOT NULL,
    "settlementId" integer NOT NULL,
    street         text    NOT NULL,
    building       text    NOT NULL,
    block          text,
    flat           text    NOT NULL,
    zipcode        text,
    "customerId"   integer NOT NULL
);


ALTER TABLE public."Address"
    OWNER TO postgres;

--
-- Name: Address_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Address_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Address_id_seq" OWNER TO postgres;

--
-- Name: Address_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Address_id_seq" OWNED BY public."Address".id;


--
-- Name: Country; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Country"
(
    id            integer NOT NULL,
    country       text    NOT NULL,
    "countryCode" text    NOT NULL
);


ALTER TABLE public."Country"
    OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Country_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Country_id_seq" OWNER TO postgres;

--
-- Name: Country_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Country_id_seq" OWNED BY public."Country".id;


--
-- Name: Customer; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Customer"
(
    id          integer                                                  NOT NULL,
    name        text                                                     NOT NULL,
    email       text                                                     NOT NULL,
    type        public."Type"                                            NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone                           NOT NULL
);


ALTER TABLE public."Customer"
    OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Customer_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Customer_id_seq" OWNER TO postgres;

--
-- Name: Customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Customer_id_seq" OWNED BY public."Customer".id;


--
-- Name: Phone; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Phone"
(
    id           integer NOT NULL,
    phone        text    NOT NULL,
    "customerId" integer NOT NULL
);


ALTER TABLE public."Phone"
    OWNER TO postgres;

--
-- Name: Phone_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Phone_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Phone_id_seq" OWNER TO postgres;

--
-- Name: Phone_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Phone_id_seq" OWNED BY public."Phone".id;


--
-- Name: Settlement; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Settlement"
(
    id         integer NOT NULL,
    settlement text    NOT NULL
);


ALTER TABLE public."Settlement"
    OWNER TO postgres;

--
-- Name: Settlement_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Settlement_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Settlement_id_seq" OWNER TO postgres;

--
-- Name: Settlement_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Settlement_id_seq" OWNED BY public."Settlement".id;


--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User"
(
    id             integer                                                       NOT NULL,
    name           text                                                          NOT NULL,
    email          text                                                          NOT NULL,
    password       text                                                          NOT NULL,
    role           public."Role"                  DEFAULT 'guest'::public."Role" NOT NULL,
    "refreshToken" text,
    "createdAt"    timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP      NOT NULL,
    "updatedAt"    timestamp(3) without time zone                                NOT NULL
);


ALTER TABLE public."User"
    OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."User_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."User_id_seq" OWNER TO postgres;

--
-- Name: User_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."User_id_seq" OWNED BY public."User".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations
(
    id                  character varying(36)                  NOT NULL,
    checksum            character varying(64)                  NOT NULL,
    finished_at         timestamp with time zone,
    migration_name      character varying(255)                 NOT NULL,
    logs                text,
    rolled_back_at      timestamp with time zone,
    started_at          timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer                  DEFAULT 0     NOT NULL
);


ALTER TABLE public._prisma_migrations
    OWNER TO postgres;

--
-- Name: Address id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ALTER COLUMN id SET DEFAULT nextval('public."Address_id_seq"'::regclass);


--
-- Name: Country id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ALTER COLUMN id SET DEFAULT nextval('public."Country_id_seq"'::regclass);


--
-- Name: Customer id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ALTER COLUMN id SET DEFAULT nextval('public."Customer_id_seq"'::regclass);


--
-- Name: Phone id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Phone"
    ALTER COLUMN id SET DEFAULT nextval('public."Phone_id_seq"'::regclass);


--
-- Name: Settlement id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Settlement"
    ALTER COLUMN id SET DEFAULT nextval('public."Settlement_id_seq"'::regclass);


--
-- Name: User id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ALTER COLUMN id SET DEFAULT nextval('public."User_id_seq"'::regclass);


--
-- Data for Name: Country; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Country" (id, country, "countryCode") FROM stdin;
3	Ukraine	UA
4	United Kingdom	GB
5	Germany	DE
6	Poland	PL
7	United States	US
\.


--
-- Data for Name: Settlement; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Settlement" (id, settlement) FROM stdin;
3	Kyiv
4	Lviv
6	New York City
7	Berlin
8	Warsaw
9	Detroit
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, password, role, "refreshToken", "createdAt", "updatedAt") FROM stdin;
1	test	test@mail.com	$2b$10$15WphnkwXhJcWat3N1bIUOSxLh4/GSW5G1APHBLBlVe8ud3B4b1MC	guest	\N	2025-07-13 12:34:13.883	2025-07-13 12:34:13.883
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at,
                                applied_steps_count) FROM stdin;
da1f0ae7-799f-49cd-9d36-2fbef4aca695	477fa819b25b3f320bd3215358cff997c7246734504a6aeff64e09cc84c1867b	2025-07-09 14:29:31.803562+00	20250709142931_init	\N	\N	2025-07-09 14:29:31.775029+00	1
dc1dc889-8292-4bdb-882d-879b35b7029b	e61791fe5dd254f14d8bd4342018e1035dc3e45621e76ff91cd004186e83a2a1	2025-07-12 17:02:39.055376+00	20250712170239_add_user_model	\N	\N	2025-07-12 17:02:39.019414+00	1
38681e78-f402-44bd-853e-5f43f49b304c	414e77f33d5f96dbd4ec76bd3fed60e418e86cb0b39c0b7c970cf56aa79c776b	2025-07-14 12:41:03.134877+00	20250714124103_add_phones_and_addresses_tables	\N	\N	2025-07-14 12:41:03.047769+00	1
291ad68f-34d9-4d90-a63b-23d6cac575ef	8718a2e6a9650fc49a93706e0dc6787d3213f63ccb0e2b52efe0543074ce6072	2025-07-14 14:00:14.976172+00	20250714140014_remove_polymorphism_from_phones_table	\N	\N	2025-07-14 14:00:14.96113+00	1
ed366ab8-565b-42a4-9ea7-6023494ee010	af5aa5b9050fa5b3b9761bc802c5bc421040d18c3af37ca527f3a37dffa6f199	2025-07-28 12:59:45.034414+00	20250728125944_add_on_delete_cascade_to_customer_db_relations	\N	\N	2025-07-28 12:59:45.010086+00	1
\.


--
-- Name: Address_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Address_id_seq"', 5, true);


--
-- Name: Country_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Country_id_seq"', 7, true);


--
-- Name: Customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Customer_id_seq"', 25, true);


--
-- Name: Phone_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Phone_id_seq"', 15, true);


--
-- Name: Settlement_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Settlement_id_seq"', 9, true);


--
-- Name: User_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."User_id_seq"', 9, true);


--
-- Name: Address Address_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_pkey" PRIMARY KEY (id);


--
-- Name: Country Country_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Country"
    ADD CONSTRAINT "Country_pkey" PRIMARY KEY (id);


--
-- Name: Customer Customer_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Customer"
    ADD CONSTRAINT "Customer_pkey" PRIMARY KEY (id);


--
-- Name: Phone Phone_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Phone"
    ADD CONSTRAINT "Phone_pkey" PRIMARY KEY (id);


--
-- Name: Settlement Settlement_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Settlement"
    ADD CONSTRAINT "Settlement_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Address_customerId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Address_customerId_key" ON public."Address" USING btree ("customerId");


--
-- Name: Country_countryCode_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Country_countryCode_key" ON public."Country" USING btree ("countryCode");


--
-- Name: Country_country_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Country_country_key" ON public."Country" USING btree (country);


--
-- Name: Customer_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Customer_email_key" ON public."Customer" USING btree (email);


--
-- Name: Phone_phone_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Phone_phone_key" ON public."Phone" USING btree (phone);


--
-- Name: Settlement_settlement_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Settlement_settlement_key" ON public."Settlement" USING btree (settlement);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: Address Address_countryId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES public."Country" (id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Address Address_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Address Address_settlementId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Address"
    ADD CONSTRAINT "Address_settlementId_fkey" FOREIGN KEY ("settlementId") REFERENCES public."Settlement" (id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Phone Phone_customerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Phone"
    ADD CONSTRAINT "Phone_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES public."Customer" (id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

