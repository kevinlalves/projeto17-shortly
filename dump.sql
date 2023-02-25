--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1
-- Dumped by pg_dump version 15.1

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

--
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- Name: create_update_trigger(text); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.create_update_trigger(table_name text) RETURNS void
    LANGUAGE plpgsql
    AS $$
      BEGIN
        EXECUTE format('
          CREATE TRIGGER update_%I_updated_at
          BEFORE UPDATE
          ON %I
          FOR EACH ROW
          EXECUTE FUNCTION update_updated_at()',
          table_name, table_name
        );
      END;
      $$;


--
-- Name: update_updated_at(); Type: FUNCTION; Schema: public; Owner: -
--

CREATE FUNCTION public.update_updated_at() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
      BEGIN
        NEW.updated_at = NOW();
        RETURN NEW;
      END;
      $$;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: urls; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.urls (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    short_url text NOT NULL,
    url text NOT NULL,
    visit_count integer DEFAULT 0 NOT NULL,
    user_id uuid NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    password text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Data for Name: urls; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.urls VALUES ('d596d78c-9ee9-47f7-a75e-b74474271f8e', 'puwsvx9xAFbi', 'https://9anime.pl', 0, 'bf093d74-bbd3-4c9d-b8f2-853875cac4aa', '2023-02-19 21:18:44.192141+00', '2023-02-19 21:18:44.192141+00');
INSERT INTO public.urls VALUES ('3fb667c8-4acc-4964-8abe-c371c868ec2d', 'wyH2cj6JyjSc', 'https://bing.com', 2, '73c0dcf7-4ae8-48e4-8c3f-f88e253b6780', '2023-02-19 21:54:47.068357+00', '2023-02-19 21:58:58.653707+00');
INSERT INTO public.urls VALUES ('0cc70adb-29be-4096-8511-dfe52b56108b', 'g3sPBvJ7oOTp', 'https://chat.openai.com', 1, '73c0dcf7-4ae8-48e4-8c3f-f88e253b6780', '2023-02-19 21:54:21.131167+00', '2023-02-19 22:00:38.817237+00');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('bf093d74-bbd3-4c9d-b8f2-853875cac4aa', 'kevin', 'test@gmail.com', '$2b$10$0tu5xfQaw2954GrkPPfWVuzT9P/imBVK46fhe9dw3Jn.Y2xD1.WTW', '2023-02-19 19:55:39.531603+00', '2023-02-19 19:55:39.531603+00');
INSERT INTO public.users VALUES ('73c0dcf7-4ae8-48e4-8c3f-f88e253b6780', 'caio', 'caio@gmail.com', '$2b$10$Sgng2OVmKJaUOTDtMVI2NeOSZkBUYzzEieKoTUI8c8JrR90FOF2ai', '2023-02-19 21:52:21.129878+00', '2023-02-19 21:52:21.129878+00');


--
-- Name: urls urls_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_pkey PRIMARY KEY (id);


--
-- Name: urls urls_short_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_short_url_key UNIQUE (short_url);


--
-- Name: urls urls_url_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_url_key UNIQUE (url);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: urls update_urls_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_urls_updated_at BEFORE UPDATE ON public.urls FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: users update_users_updated_at; Type: TRIGGER; Schema: public; Owner: -
--

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();


--
-- Name: urls urls_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.urls
    ADD CONSTRAINT urls_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

