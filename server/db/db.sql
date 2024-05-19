--
-- Base de datos: `gastosapp`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction`
--

CREATE TABLE `transaction` (
  `id_transaction` int(11) NOT NULL,
  `id_wallet` int(100) NOT NULL,
  `id_transaction_type` int(11) NOT NULL,
  `amount` int(50) NOT NULL,
  `description` varchar(150) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `transaction_type`
--

CREATE TABLE `transaction_type` (
  `id_transaction` int(11) NOT NULL,
  `transaction_type` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Volcado de datos para la tabla `transaction_type`
--

INSERT INTO `transaction_type` (`id_transaction`, `transaction_type`) VALUES
(1, 'income'),
(2, 'expense');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id_user` int(11) NOT NULL,
  `user` varchar(50) NOT NULL,
  `user_name` varchar(50) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `wallet`
--

CREATE TABLE `wallet` (
  `id_wallet` int(11) NOT NULL,
  `wallet_name` varchar(50) NOT NULL,
  `wallet_created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id_transaction`);

--
-- Indices de la tabla `transaction_type`
--
ALTER TABLE `transaction_type`
  ADD PRIMARY KEY (`id_transaction`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id_user`);

--
-- Indices de la tabla `wallet`
--
ALTER TABLE `wallet`
  ADD PRIMARY KEY (`id_wallet`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `transaction_type`
--
ALTER TABLE `transaction_type`
  MODIFY `id_transaction` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `wallet`
--
ALTER TABLE `wallet`
  MODIFY `id_wallet` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;
