--
-- PostgreSQL database dump
--

\restrict NPhiImwvDZYS5mWoZHNJWuuHFMFcuxwgedcwzAfNRMD5DrStdVgEEGG0hA3iYmt

-- Dumped from database version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 16.10 (Ubuntu 16.10-0ubuntu0.24.04.1)

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
-- Name: CategoryType; Type: TYPE; Schema: public; Owner: postgres
--

CREATE TYPE public."CategoryType" AS ENUM (
    'top',
    'bottom',
    'outer',
    'dress',
    'shoes',
    'bag',
    'accessory'
);


ALTER TYPE public."CategoryType" OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Category; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Category" (
    id integer NOT NULL,
    type public."CategoryType" NOT NULL,
    name text NOT NULL,
    brand text NOT NULL,
    price double precision NOT NULL,
    "styleId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Category" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Category_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Category_id_seq" OWNER TO postgres;

--
-- Name: Category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Category_id_seq" OWNED BY public."Category".id;


--
-- Name: Comment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Comment" (
    id integer NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "curationId" integer NOT NULL
);


ALTER TABLE public."Comment" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Comment_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Comment_id_seq" OWNER TO postgres;

--
-- Name: Comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Comment_id_seq" OWNED BY public."Comment".id;


--
-- Name: Curation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Curation" (
    id integer NOT NULL,
    nickname text NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    trendy integer NOT NULL,
    personality integer NOT NULL,
    practicality integer NOT NULL,
    "costEffectiveness" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    "stylesId" integer NOT NULL
);


ALTER TABLE public."Curation" OWNER TO postgres;

--
-- Name: Curation_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Curation_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Curation_id_seq" OWNER TO postgres;

--
-- Name: Curation_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Curation_id_seq" OWNED BY public."Curation".id;


--
-- Name: Images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Images" (
    id integer NOT NULL,
    "isPrimary" boolean NOT NULL,
    url text NOT NULL,
    "stylesId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Images" OWNER TO postgres;

--
-- Name: Images_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Images_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Images_id_seq" OWNER TO postgres;

--
-- Name: Images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Images_id_seq" OWNED BY public."Images".id;


--
-- Name: Styles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Styles" (
    id integer NOT NULL,
    nickname text NOT NULL,
    title text NOT NULL,
    content text NOT NULL,
    password text NOT NULL,
    "viewCount" integer,
    "curationCount" integer,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Styles" OWNER TO postgres;

--
-- Name: Styles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Styles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Styles_id_seq" OWNER TO postgres;

--
-- Name: Styles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Styles_id_seq" OWNED BY public."Styles".id;


--
-- Name: Tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Tags" (
    id integer NOT NULL,
    name text NOT NULL,
    "stylesId" integer NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Tags" OWNER TO postgres;

--
-- Name: Tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."Tags_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."Tags_id_seq" OWNER TO postgres;

--
-- Name: Tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."Tags_id_seq" OWNED BY public."Tags".id;


--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Name: Category id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category" ALTER COLUMN id SET DEFAULT nextval('public."Category_id_seq"'::regclass);


--
-- Name: Comment id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment" ALTER COLUMN id SET DEFAULT nextval('public."Comment_id_seq"'::regclass);


--
-- Name: Curation id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Curation" ALTER COLUMN id SET DEFAULT nextval('public."Curation_id_seq"'::regclass);


--
-- Name: Images id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Images" ALTER COLUMN id SET DEFAULT nextval('public."Images_id_seq"'::regclass);


--
-- Name: Styles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Styles" ALTER COLUMN id SET DEFAULT nextval('public."Styles_id_seq"'::regclass);


--
-- Name: Tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags" ALTER COLUMN id SET DEFAULT nextval('public."Tags_id_seq"'::regclass);


--
-- Data for Name: Category; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Category" (id, type, name, brand, price, "styleId", "createdAt", "updatedAt") FROM stdin;
1	top	화이트 셔츠	Uniqlo	39000	1	2025-01-01 00:00:00	2025-01-01 00:00:00
2	bottom	블랙 슬랙스	Musinsa	49000	1	2025-01-01 00:00:00	2025-01-01 00:00:00
3	shoes	로퍼	Dr.Martens	129000	1	2025-01-01 00:00:00	2025-01-01 00:00:00
4	top	데님 자켓	Zara	69000	2	2025-01-01 00:00:00	2025-01-01 00:00:00
5	bottom	라이트진	Levi’s	89000	2	2025-01-01 00:00:00	2025-01-01 00:00:00
6	outer	울 코트	TNGT	189000	3	2025-01-01 00:00:00	2025-01-01 00:00:00
7	accessory	머플러	H&M	29000	3	2025-01-01 00:00:00	2025-01-01 00:00:00
8	top	크롭티	8Seconds	19000	4	2025-01-01 00:00:00	2025-01-01 00:00:00
9	bottom	와이드팬츠	Nike	59000	4	2025-01-01 00:00:00	2025-01-01 00:00:00
10	outer	가디건	Musinsa	49000	5	2025-01-01 00:00:00	2025-01-01 00:00:00
11	bottom	데님팬츠	Zara	69000	5	2025-01-01 00:00:00	2025-01-01 00:00:00
12	top	니트 가디건	Musinsa Standard	49000	6	2025-10-01 10:20:00	2025-10-03 09:50:00
13	bottom	데님 팬츠	Levi's	89000	6	2025-10-01 10:21:00	2025-10-03 09:51:00
14	top	화이트 셔츠	Musinsa Standard	29900	7	2025-10-02 11:25:00	2025-10-04 09:00:00
15	bottom	블랙 슬랙스	Musinsa Standard	49900	7	2025-10-02 11:26:00	2025-10-04 09:01:00
16	top	후드티	Musinsa Standard	39000	8	2025-10-05 09:15:00	2025-10-06 10:30:00
17	bottom	조거팬츠	Musinsa Standard	45000	8	2025-10-05 09:16:00	2025-10-06 10:31:00
18	top	브이넥 니트	Musinsa Standard	39000	9	2025-10-07 10:30:00	2025-10-07 11:20:00
19	outer	울 블렌드 코트	Musinsa Standard	129000	10	2025-10-08 09:25:00	2025-10-08 10:30:00
20	top	린넨 셔츠	Musinsa Standard	34900	11	2025-10-09 08:55:00	2025-10-09 10:00:00
21	top	하프집 맨투맨	Musinsa Standard	35900	12	2025-10-10 10:30:00	2025-10-10 11:35:00
22	bottom	블랙 슬림 팬츠	Musinsa Standard	49000	13	2025-10-11 09:25:00	2025-10-11 11:00:00
\.


--
-- Data for Name: Comment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Comment" (id, content, password, "createdAt", "updatedAt", "curationId") FROM stdin;
1	이 코디 정말 참고할만해요!	cm1	2025-01-01 00:00:00	2025-01-01 00:00:00	1
2	깔끔하고 좋아요.	cm2	2025-01-01 00:00:00	2025-01-01 00:00:00	2
3	따뜻한 봄 느낌이에요.	cm3	2025-01-01 00:00:00	2025-01-01 00:00:00	3
4	겨울 감성 최고네요.	cm4	2025-01-01 00:00:00	2025-01-01 00:00:00	4
5	스트릿 감성 굿!	cm5	2025-01-01 00:00:00	2025-01-01 00:00:00	5
6	가을 무드 최고예요.	cm6	2025-01-01 00:00:00	2025-01-01 00:00:00	6
7	컬러 매치가 너무 예뻐요. 가을 느낌이 물씬 나네요!	ynA92lRt53xC	2025-10-02 14:20:00	2025-10-02 15:00:00	7
8	편안하면서도 스타일리시하네요. 참고할게요!	dmS84zQn61vR	2025-10-03 11:10:00	2025-10-03 11:50:00	8
9	톤온톤 조합이 정말 안정적이에요. 보기 좋아요.	mnF65pRs72tB	2025-10-04 13:40:00	2025-10-04 14:10:00	9
10	셔츠 핏이 너무 자연스럽네요. 색감도 굿!	jsD49kMp83yL	2025-10-05 09:00:00	2025-10-05 09:45:00	10
11	상의랑 하의 비율이 완벽해요. 사진 구도도 예쁘네요.	heB73nLs14pV	2025-10-06 12:15:00	2025-10-06 13:00:00	11
12	셔츠와 니트 조합이 따뜻하고 좋아요.	hjL92sQp87zA	2025-10-07 12:30:00	2025-10-07 13:10:00	12
13	코트핏이 깔끔해서 겨울룩에 잘 어울리네요.	ehX84nLp22tZ	2025-10-08 11:20:00	2025-10-08 12:10:00	13
14	린넨의 내추럴한 질감이 정말 잘 살아있어요.	soR56nMv03yB	2025-10-09 10:10:00	2025-10-09 11:00:00	14
\.


--
-- Data for Name: Curation; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Curation" (id, nickname, content, password, trendy, personality, practicality, "costEffectiveness", "createdAt", "updatedAt", "stylesId") FROM stdin;
1	curator_1	깔끔한 오피스룩이에요.	cpwpwpwpw1	8	7	9	8	2025-01-01 00:00:00	2025-01-01 00:00:00	1
2	curator_2	출근용으로 딱입니다.	cpwpwpwpw2	7	6	8	9	2025-01-01 00:00:00	2025-01-01 00:00:00	1
3	curator_3	봄 느낌 물씬 나요.	cpwpwpwpw3	9	8	7	8	2025-01-01 00:00:00	2025-01-01 00:00:00	2
4	curator_4	따뜻하고 포근한 느낌!	cpwpwpwpw4	8	9	7	6	2025-01-01 00:00:00	2025-01-01 00:00:00	3
5	curator_5	스트릿 감성 좋아요.	cpwpwpwpw5	9	7	6	7	2025-01-01 00:00:00	2025-01-01 00:00:00	4
6	curator_6	가을 감성이 물씬 나네요.	cpwpwpwpw6	7	8	8	8	2025-01-01 00:00:00	2025-01-01 00:00:00	5
7	minji	톤온톤 조합이 부드럽고 따뜻한 느낌이에요.	fj38Lskd91Qv	9	8	7	8	2025-10-01 12:00:00	2025-10-03 10:00:00	6
8	soobin	깔끔하고 단정한 인상이 돋보입니다.	pwLz49nQ83hf	8	7	9	8	2025-10-02 12:10:00	2025-10-04 09:10:00	7
9	yuna	편하게 입기 좋은 스트릿 무드네요.	xR72abN8qL90	7	8	9	9	2025-10-05 09:30:00	2025-10-06 10:40:00	8
10	hajin	셔츠 위에 니트를 매치하니 포근하고 따뜻해요.	haN64fJs19xB	8	8	9	8	2025-10-07 12:00:00	2025-10-07 13:00:00	9
11	eunho	겨울 감성 가득한 코트룩이네요.	euH92mQs84zW	9	8	7	8	2025-10-08 11:00:00	2025-10-08 12:00:00	10
12	sora	린넨 특유의 시원한 분위기가 좋네요.	srT45vNp91yL	7	8	9	9	2025-10-09 10:00:00	2025-10-09 11:00:00	11
13	jimin	가볍고 활동성 좋은 조합이에요.	jiM78qZw32cR	8	9	9	8	2025-10-10 12:00:00	2025-10-10 13:00:00	12
14	hyunwoo	블랙앤화이트 조합이 깔끔하고 단정합니다.	hwC59rLp07sK	8	8	8	8	2025-10-11 12:00:00	2025-10-11 13:00:00	13
\.


--
-- Data for Name: Images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Images" (id, "isPrimary", url, "stylesId", "createdAt", "updatedAt") FROM stdin;
1	t	https://picsum.photos/id/11/600/400	1	2025-01-01 00:00:00	2025-01-01 00:00:00
2	f	https://picsum.photos/id/12/600/400	1	2025-01-01 00:00:00	2025-01-01 00:00:00
3	t	https://picsum.photos/id/21/600/400	2	2025-01-01 00:00:00	2025-01-01 00:00:00
4	t	https://picsum.photos/id/31/600/400	3	2025-01-01 00:00:00	2025-01-01 00:00:00
5	f	https://picsum.photos/id/32/600/400	3	2025-01-01 00:00:00	2025-01-01 00:00:00
6	t	https://picsum.photos/id/41/600/400	4	2025-01-01 00:00:00	2025-01-01 00:00:00
7	t	https://picsum.photos/id/51/600/400	5	2025-01-01 00:00:00	2025-01-01 00:00:00
8	f	https://picsum.photos/id/52/600/400	5	2025-01-01 00:00:00	2025-01-01 00:00:00
9	t	https://images.unsplash.com/photo-1682685794760-3e7e1d796be4	6	2025-10-01 10:10:00	2025-10-03 09:40:00
10	t	https://images.unsplash.com/photo-1682686578222-6aafc2a22a2b	7	2025-10-02 11:15:00	2025-10-04 08:50:00
11	t	https://images.unsplash.com/photo-1682695791037-7b9e9cf40e7a	8	2025-10-05 09:05:00	2025-10-06 10:20:00
12	t	https://images.unsplash.com/photo-1683009427032-1f84a6a7b722	9	2025-10-07 10:10:00	2025-10-07 11:10:00
13	t	https://images.unsplash.com/photo-1679932156433-2f909f1b01d7	10	2025-10-08 09:10:00	2025-10-08 10:20:00
14	t	https://images.unsplash.com/photo-1680951732398-7a7ff76d43f0	11	2025-10-09 08:40:00	2025-10-09 09:50:00
15	t	https://images.unsplash.com/photo-1684324872744-9948e1e272db	12	2025-10-10 10:15:00	2025-10-10 11:25:00
16	t	https://images.unsplash.com/photo-1681043618723-7c7cc6a01c2a	13	2025-10-11 09:10:00	2025-10-11 10:50:00
\.


--
-- Data for Name: Styles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Styles" (id, nickname, title, content, password, "viewCount", "curationCount", "createdAt", "updatedAt") FROM stdin;
1	keony	미니멀 오피스룩	화이트 셔츠와 블랙 슬랙스로 구성된 깔끔한 출근룩.	 pwpwpwpw1	1200	2	2025-01-01 00:00:00	2025-01-01 00:00:00
2	sora	봄 데일리 캐주얼	가벼운 자켓과 청바지로 완성한 캐주얼 봄 코디.	 pwpwpwpw2	980	1	2025-01-01 00:00:00	2025-01-01 00:00:00
3	minsu	겨울 감성룩	코트와 머플러로 따뜻한 분위기의 감성 스타일.	 pwpwpwpw3	1500	3	2025-01-01 00:00:00	2025-01-01 00:00:00
4	yuna	여름 스트릿룩	와이드팬츠와 크롭티로 시원한 스트릿 무드 완성.	 pwpwpwpw4	800	1	2025-01-01 00:00:00	2025-01-01 00:00:00
5	taeyang	가을 데이트룩	브라운 가디건과 데님으로 따뜻한 데이트 감성.	 pwpwpwpw5	1100	2	2025-01-01 00:00:00	2025-01-01 00:00:00
6	minji	가을 캐주얼 데일리룩	부드러운 가디건과 데님 팬츠로 완성한 따뜻한 데일리룩.	mnJ482skQ9	132	4	2025-10-01 10:00:00	2025-10-03 09:30:00
7	soobin	오피스 미니멀룩	화이트 셔츠와 블랙 슬랙스로 심플한 오피스룩.	sbnA93lpXf1	208	3	2025-10-02 11:00:00	2025-10-04 08:45:00
8	yuna	편안한 주말 스트릿룩	후드티와 조거팬츠로 완성한 캐주얼 스트릿 스타일.	yuN549zRt8	97	2	2025-10-05 09:00:00	2025-10-06 10:10:00
9	hajin	간절기 레이어드룩	셔츠와 니트를 함께 매치해 포근하면서 세련된 간절기 코디.	hjL92sQp87zA	185	3	2025-10-07 10:00:00	2025-10-07 11:00:00
10	eunho	겨울 오버핏 코트룩	롱코트와 머플러로 완성한 감성적인 겨울 스타일.	ehX84nLp22tZ	266	5	2025-10-08 09:00:00	2025-10-08 10:15:00
11	sora	여름 린넨 셋업룩	린넨 셔츠와 팬츠로 시원하게 연출한 썸머 셋업 스타일.	soR56nMv03yB	119	2	2025-10-09 08:30:00	2025-10-09 09:45:00
12	jimin	하프집 맨투맨 캐주얼룩	트레이닝 팬츠와 하프집 맨투맨으로 완성한 가벼운 캐주얼룩.	jmF39pKs71vR	152	3	2025-10-10 10:00:00	2025-10-10 11:20:00
13	hyunwoo	블랙앤화이트 모노톤룩	깔끔한 대비감으로 포멀한 인상을 주는 모노톤 스타일.	hwT67qNj94bP	230	4	2025-10-11 09:00:00	2025-10-11 10:40:00
\.


--
-- Data for Name: Tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Tags" (id, name, "stylesId", "createdAt", "updatedAt") FROM stdin;
1	미니멀	1	2025-01-01 00:00:00	2025-01-01 00:00:00
2	오피스룩	1	2025-01-01 00:00:00	2025-01-01 00:00:00
3	봄패션	2	2025-01-01 00:00:00	2025-01-01 00:00:00
4	캐주얼	2	2025-01-01 00:00:00	2025-01-01 00:00:00
5	겨울코디	3	2025-01-01 00:00:00	2025-01-01 00:00:00
6	감성	3	2025-01-01 00:00:00	2025-01-01 00:00:00
7	스트릿	4	2025-01-01 00:00:00	2025-01-01 00:00:00
8	여름패션	4	2025-01-01 00:00:00	2025-01-01 00:00:00
9	데이트룩	5	2025-01-01 00:00:00	2025-01-01 00:00:00
10	가을감성	5	2025-01-01 00:00:00	2025-01-01 00:00:00
11	가을룩	6	2025-10-01 10:15:00	2025-10-03 09:45:00
12	캐주얼	6	2025-10-01 10:16:00	2025-10-03 09:46:00
13	오피스룩	7	2025-10-02 11:20:00	2025-10-04 08:55:00
14	미니멀	7	2025-10-02 11:21:00	2025-10-04 08:56:00
15	스트릿	8	2025-10-05 09:10:00	2025-10-06 10:25:00
16	레이어드	9	2025-10-07 10:20:00	2025-10-07 11:15:00
17	겨울룩	10	2025-10-08 09:20:00	2025-10-08 10:25:00
18	린넨	11	2025-10-09 08:50:00	2025-10-09 09:55:00
19	트레이닝	12	2025-10-10 10:25:00	2025-10-10 11:30:00
20	모노톤	13	2025-10-11 09:20:00	2025-10-11 10:55:00
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
f484c93b-9b3f-489f-ac99-22300924b731	83e168f3ab3701c30d366cd014affa360b125e02d468b3c0e58651dd2541a612	2025-11-05 17:24:17.351837+09	20251104083843_init	\N	\N	2025-11-05 17:24:17.262336+09	1
4c46b1f7-6315-400b-9b9d-66c125b8ac54	68d280f35a75e4db39b24bef520d6c34e8d425b7bc2b239ce3320c02c9f7337b	2025-11-05 17:24:17.376032+09	20251104084420_change_images	\N	\N	2025-11-05 17:24:17.354642+09	1
\.


--
-- Name: Category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Category_id_seq"', 1, false);


--
-- Name: Comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Comment_id_seq"', 1, false);


--
-- Name: Curation_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Curation_id_seq"', 1, false);


--
-- Name: Images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Images_id_seq"', 1, false);


--
-- Name: Styles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Styles_id_seq"', 1, false);


--
-- Name: Tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public."Tags_id_seq"', 1, false);


--
-- Name: Category Category_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_pkey" PRIMARY KEY (id);


--
-- Name: Comment Comment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_pkey" PRIMARY KEY (id);


--
-- Name: Curation Curation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Curation"
    ADD CONSTRAINT "Curation_pkey" PRIMARY KEY (id);


--
-- Name: Images Images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Images"
    ADD CONSTRAINT "Images_pkey" PRIMARY KEY (id);


--
-- Name: Styles Styles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Styles"
    ADD CONSTRAINT "Styles_pkey" PRIMARY KEY (id);


--
-- Name: Tags Tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Comment_curationId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Comment_curationId_key" ON public."Comment" USING btree ("curationId");


--
-- Name: Category Category_styleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Category"
    ADD CONSTRAINT "Category_styleId_fkey" FOREIGN KEY ("styleId") REFERENCES public."Styles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Comment Comment_curationId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Comment"
    ADD CONSTRAINT "Comment_curationId_fkey" FOREIGN KEY ("curationId") REFERENCES public."Curation"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Curation Curation_stylesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Curation"
    ADD CONSTRAINT "Curation_stylesId_fkey" FOREIGN KEY ("stylesId") REFERENCES public."Styles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Images Images_stylesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Images"
    ADD CONSTRAINT "Images_stylesId_fkey" FOREIGN KEY ("stylesId") REFERENCES public."Styles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Tags Tags_stylesId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Tags"
    ADD CONSTRAINT "Tags_stylesId_fkey" FOREIGN KEY ("stylesId") REFERENCES public."Styles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict NPhiImwvDZYS5mWoZHNJWuuHFMFcuxwgedcwzAfNRMD5DrStdVgEEGG0hA3iYmt

