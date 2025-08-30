--
-- PostgreSQL database dump
--

-- Dumped from database version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.18 (Ubuntu 14.18-0ubuntu0.22.04.1)

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
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.users VALUES ('63c1cf3a-51f5-488c-b6df-ab0434891906', 'samuelfasanya@gmail.com', '$2b$10$RdFe3B.WUZB3ZJpr/14cG.NuJDu4Ft348fnQMqjQbcEKhcNQQUpMS', 'user', false, NULL, NULL, '2025-06-12 01:50:20.217349');
INSERT INTO public.users VALUES ('c1043bd2-83ce-429f-ac54-995cf65a4d39', 'sammyfash@gmail.com', '$2b$10$mcxTRA8NcdyxHBircJ/PKujTAdLyRDBW.Fr1QDoCJq8.YKkfNpRhW', 'user', false, NULL, NULL, '2025-06-12 04:08:56.15206');
INSERT INTO public.users VALUES ('87360082-9ccb-4157-913f-46fd10ce3df0', 'admin@example.com', '$2b$10$yIKgsNHTJ4TfzJf4haBOSe9bSbLIeS9H7a7gs746JggZmRON/0DAm', 'admin', false, NULL, NULL, '2025-07-07 04:43:32.881089');
INSERT INTO public.users VALUES ('cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'samfash@gmail.com', '$2b$10$9.GLnrFzHkk3gmb3kIorcOcFglg301svGu0W7GTDKmOy7iOBq3l9a', 'tailor', false, NULL, NULL, '2025-06-12 03:13:09.820367');
INSERT INTO public.users VALUES ('fbd47926-1670-41e8-be78-659f0f5274b3', 'fasanyasamuel36@gmail.com', '$2b$10$8361oqR9iHBXkFLAJjZwoODngoeXljASmNZjeTLNMFSbH37VL6ew2', 'user', true, '82b09786fb6974422b12f1ac5a1f373e8edb62bd915f932a1abb7c754f94b2da', '2025-08-28 04:59:04.601', '2025-04-06 11:06:02.085391');


--
-- Data for Name: profiles; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.profiles VALUES ('fa7405ce-903e-4bf6-a4b4-c8ed9bc7a884', 'c1043bd2-83ce-429f-ac54-995cf65a4d39', 'sam', 'male', 'ajibulu', '2025-06-12 04:09:32.255147');
INSERT INTO public.profiles VALUES ('b96a3428-2f6b-4c49-9da2-530cf026d256', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'samuel fasanya', 'male', 'no 18 ajibulu str', '2025-06-12 02:14:06.364');
INSERT INTO public.profiles VALUES ('54467e46-3791-4cc6-a8e4-c55092693bee', 'fbd47926-1670-41e8-be78-659f0f5274b3', 'Samuel Fasanya', 'male', 'No 18 ajibulu street, oshodi, lagos.', '2025-08-28 00:27:17.781523');


--
-- Data for Name: female_measurements; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Data for Name: male_measurements; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.male_measurements VALUES ('4731e220-a771-44c1-a769-043b2dd5c776', 'fa7405ce-903e-4bf6-a4b4-c8ed9bc7a884', 2.00, 7.00, 9.00, 6.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.male_measurements VALUES ('5d7fde0e-ea03-41ba-b98e-f1846cb0bd36', 'b96a3428-2f6b-4c49-9da2-530cf026d256', 9.87, 9.99, 10.01, 10.00, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO public.male_measurements VALUES ('f3a1f8cb-c418-4395-8784-ebb2cacf3f1f', '54467e46-3791-4cc6-a8e4-c55092693bee', 10.00, 29.00, 22.97, 11.97, NULL, NULL, NULL, NULL, NULL, NULL, NULL);


--
-- Data for Name: notifications; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.notifications VALUES ('8d276c6c-bdf7-478c-ba39-12da8dafa8dc', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'my first job', 'needs to be completed in 2 weeks', false, '2025-07-09 02:33:55.49087');
INSERT INTO public.notifications VALUES ('279a8230-9aab-45cf-8d68-9ea294458c50', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'my second', 'i am just testing now', false, '2025-07-09 02:44:44.139001');
INSERT INTO public.notifications VALUES ('d2d78789-9692-4a50-9b98-d30da9dbee98', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'test 3', 'still testing', false, '2025-07-09 02:51:33.240573');
INSERT INTO public.notifications VALUES ('ea13bae1-2590-4cc2-8131-1c86da1b723f', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', '4th one', 'need to see in backend', false, '2025-07-09 03:02:38.352945');
INSERT INTO public.notifications VALUES ('64ac77bb-b6d3-4c27-9d51-0a272d264258', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'th 5th', 'just tired', false, '2025-07-09 03:10:40.418539');
INSERT INTO public.notifications VALUES ('38a33605-e589-4083-8638-633037d0fe84', 'cf39d76c-7e7a-44d3-ae14-a5aa2b00b2fb', 'last one ', 'hopefully i need to sleep', false, '2025-07-09 03:16:17.683821');


--
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.orders VALUES ('5a3e9155-af41-43f3-99b6-86190ace265d', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 01:44:52.241013', '2025-08-28 01:44:52.241013');
INSERT INTO public.orders VALUES ('4ec7e850-d112-48a7-8a67-d7ec75feab06', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:08:37.608219', '2025-08-28 02:08:37.608219');
INSERT INTO public.orders VALUES ('9c45f157-c366-4f02-9c8e-9caaba42d589', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:18:17.40969', '2025-08-28 02:18:17.40969');
INSERT INTO public.orders VALUES ('563b57a3-459e-4d9a-8521-83b49755ed49', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:26:54.771315', '2025-08-28 02:26:54.771315');
INSERT INTO public.orders VALUES ('4bde5ecf-a32b-42fc-91ca-d23239c37a9b', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:29:38.949339', '2025-08-28 02:29:38.949339');
INSERT INTO public.orders VALUES ('a704d3ad-9984-4e80-8bca-22eb0e5b6010', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:47:11.520745', '2025-08-28 02:47:11.520745');
INSERT INTO public.orders VALUES ('473adceb-f244-4d75-9f33-341746481feb', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:48:57.655671', '2025-08-28 02:48:57.655671');
INSERT INTO public.orders VALUES ('9947fab4-6078-484b-920f-63f70d07ee26', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:50:56.20571', '2025-08-28 02:50:56.20571');
INSERT INTO public.orders VALUES ('bbcc1823-04fa-4355-a2c7-34040f9fd51e', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 02:52:18.818695', '2025-08-28 02:52:18.818695');
INSERT INTO public.orders VALUES ('e114af35-40bc-45c2-9984-6fb715381720', 'fbd47926-1670-41e8-be78-659f0f5274b3', 2400.00, 'No 18 ajibulu street, oshodi, lagos.', '', 'processing', '2025-08-28 03:05:52.09109', '2025-08-28 03:05:52.09109');


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.products VALUES ('0b96e270-059a-4821-ad81-4536fc65e772', 'tux', 'fresh ass tux', 'male', 300.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1752029726723-gentleman.jpg', '2025-07-09 03:55:28.345398', '2025-07-09 03:55:28.345398');
INSERT INTO public.products VALUES ('105fae2b-9ef3-45e1-a57d-3cbd84acc6ae', 'amira boubou', 'A red stylish boubou fit for any occasion and outing.', 'female', 100.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754113739255-amira_boubou.jpg', '2025-08-02 06:49:00.542183', '2025-08-02 06:49:00.542183');
INSERT INTO public.products VALUES ('53821628-9d66-43d5-81e2-872997641f6a', 'Ashabi Dress', 'A long fitting sleeveless gown, comes in various colors.', 'female', 75.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754114096892-asabi_dress.jpg', '2025-08-02 06:54:57.937931', '2025-08-02 06:54:57.937931');
INSERT INTO public.products VALUES ('e61baca1-eeb6-450d-8822-bbffb5c0060f', 'Donna dress', 'A simply elegant gown, a classy dress for a classy lady', 'female', 82.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754114176307-donna_dress.jpg', '2025-08-02 06:56:16.665808', '2025-08-02 06:56:16.665808');
INSERT INTO public.products VALUES ('dff5a57e-dc07-46ce-8481-0c1243ce33d8', 'Lila set', 'This is strictly a dress for relaxation especially at the beach.', 'female', 105.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754114275401-lila_set.jpg', '2025-08-02 06:57:56.727302', '2025-08-02 06:57:56.727302');
INSERT INTO public.products VALUES ('1cdd4c5e-540a-4529-9bc7-0898d28bbed3', 'Lily Dress', 'A long gown for a casual occasion.', 'female', 65.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754114437517-lily_dress.jpg', '2025-08-02 07:00:37.722777', '2025-08-02 07:00:37.722777');
INSERT INTO public.products VALUES ('bd085960-9925-4bef-8b82-3bc16705319f', 'office tuesday', 'A shirt and trouser for  corporate gathering.', 'female', 70.00, 'https://dwanetailoring.s3.eu-north-1.amazonaws.com/products/1754114687172-ofiice_casual.jpg', '2025-08-02 07:04:48.03298', '2025-08-02 07:04:48.03298');


--
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.order_items VALUES ('51b58486-c044-4af3-a45e-69c3cb1c6e6a', '5a3e9155-af41-43f3-99b6-86190ace265d', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 01:44:52.241013');
INSERT INTO public.order_items VALUES ('b8c3408f-d0ca-4b77-aa71-2f6d527347cc', '4ec7e850-d112-48a7-8a67-d7ec75feab06', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:08:37.608219');
INSERT INTO public.order_items VALUES ('e6fb3fa5-6464-4324-80cf-859ccd247d1b', '9c45f157-c366-4f02-9c8e-9caaba42d589', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:18:17.40969');
INSERT INTO public.order_items VALUES ('f657c531-969a-41ec-ade5-ecf30857c140', '563b57a3-459e-4d9a-8521-83b49755ed49', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:26:54.771315');
INSERT INTO public.order_items VALUES ('d9b11591-bfdd-4cfc-bfd5-d80106658372', '4bde5ecf-a32b-42fc-91ca-d23239c37a9b', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:29:38.949339');
INSERT INTO public.order_items VALUES ('079f2fac-98de-4021-bd51-cbf694b80be6', 'a704d3ad-9984-4e80-8bca-22eb0e5b6010', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:47:11.520745');
INSERT INTO public.order_items VALUES ('8e9e3a0d-c079-4fca-a186-2bd167f5e0d8', '473adceb-f244-4d75-9f33-341746481feb', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:48:57.655671');
INSERT INTO public.order_items VALUES ('a16a21e7-6a87-4322-89b7-ccc24b0b5b4e', '9947fab4-6078-484b-920f-63f70d07ee26', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:50:56.20571');
INSERT INTO public.order_items VALUES ('11be2f96-a828-4981-b4d4-00bb68911b78', 'bbcc1823-04fa-4355-a2c7-34040f9fd51e', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 02:52:18.818695');
INSERT INTO public.order_items VALUES ('5094f03e-24c7-4432-a144-d49af7f9a44b', 'e114af35-40bc-45c2-9984-6fb715381720', '0b96e270-059a-4821-ad81-4536fc65e772', 8, 300.00, '2025-08-28 03:05:52.09109');


--
-- Data for Name: payments; Type: TABLE DATA; Schema: public; Owner: -
--

INSERT INTO public.payments VALUES ('e349f928-f636-4e8b-9ff5-4d9d89618028', '9947fab4-6078-484b-920f-63f70d07ee26', 'fbd47926-1670-41e8-be78-659f0f5274b3', 'paystack', 'g3b5diaisv', 'pending', 2400.00, 'NGN', false, NULL, '2025-08-28 02:50:57.256141', '2025-08-28 02:50:57.256141');
INSERT INTO public.payments VALUES ('0026b5ff-78b9-4ffc-a1e3-f4bee0187805', 'bbcc1823-04fa-4355-a2c7-34040f9fd51e', 'fbd47926-1670-41e8-be78-659f0f5274b3', 'paystack', 'jrpkrog1ws', 'pending', 2400.00, 'NGN', false, NULL, '2025-08-28 02:52:22.619993', '2025-08-28 02:52:22.619993');
INSERT INTO public.payments VALUES ('f7c8b796-6244-4c19-a4d7-834a5754d26d', 'e114af35-40bc-45c2-9984-6fb715381720', 'fbd47926-1670-41e8-be78-659f0f5274b3', 'paystack', '975v1osoth', 'pending', 2400.00, 'NGN', false, NULL, '2025-08-28 03:05:55.289362', '2025-08-28 03:05:55.289362');


--
-- Data for Name: pgmigrations; Type: TABLE DATA; Schema: public; Owner: -
--



--
-- Name: pgmigrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: -
--

SELECT pg_catalog.setval('public.pgmigrations_id_seq', 1, false);


--
-- PostgreSQL database dump complete
--

